/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource'],
  function(oj, ko) {
     function ControllerViewModel() {
       var self = this;

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

       // Router setup
       self.router = oj.Router.rootInstance;
       self.router.configure({
         'dashboard': {label: 'Dashboard', isDefault: true},
         'products': {label: 'Products'},
         'customers': {label: 'Customers'},
         'about': {label: 'About'}
       });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      // Navigation setup
      var navData = [
      {name: 'Home', id: 'dashboard',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
      {name: 'Browse Catalog', id: 'products',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
      {name: 'Order History', id: 'customers',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'},
      {name: 'Your Profile', id: 'about',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'}
      ];
      self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("Soaring through the Clouds Webshop Portal");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("Not yet logged in");

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('GitHub Repo', 'gitHub', 'https://github.com/lucasjellema/soaring-through-the-cloud-native-sequel'),
        new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),        
      ]);
     }

     return new ControllerViewModel();
  }
);
