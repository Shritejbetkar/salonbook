// Dark Mode Controller
class DarkMode {
    constructor() {
      this.toggle = document.getElementById('darkModeToggle');
      this.styleElement = document.getElementById('darkModeStyle');
      this.body = document.body;
      this.isEnabled = false;
      
      this.init();
    }
  
    init() {
      // Check for saved preference or system preference
      this.checkPreferences();
      
      // Set up event listeners
      this.setupEventListeners();
      
      // Apply initial state
      this.applyMode();
    }
  
    checkPreferences() {
      const savedMode = localStorage.getItem('darkMode');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Priority: saved preference > system preference > light mode
      this.isEnabled = savedMode 
        ? savedMode === 'enabled'
        : systemPrefersDark;
        
      // Update toggle state if element exists
      if (this.toggle) {
        this.toggle.checked = this.isEnabled;
      }
    }
  
    setupEventListeners() {
      // Toggle switch
      if (this.toggle) {
        this.toggle.addEventListener('change', () => this.toggleMode());
      }
      
      // Watch for system preference changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('darkMode')) {
          this.isEnabled = e.matches;
          this.applyMode();
        }
      });
    }
  
    toggleMode() {
      this.isEnabled = !this.isEnabled;
      localStorage.setItem('darkMode', this.isEnabled ? 'enabled' : 'disabled');
      this.applyMode();
    }
  
    applyMode() {
      // Toggle dark mode class on body
      this.body.classList.toggle('dark-mode', this.isEnabled);
      
      // Enable/disable dark mode stylesheet
      if (this.styleElement) {
        this.styleElement.disabled = !this.isEnabled;
      }
      
      // Dispatch event for other components
      document.dispatchEvent(new CustomEvent('darkModeChange', {
        detail: { isDarkMode: this.isEnabled }
      }));
    }
  }
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new DarkMode();
  });