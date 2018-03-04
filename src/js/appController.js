/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource', 'ojs/ojmenu'],
  function (oj, ko) {
    function ControllerViewModel() {
      var self = this;

      self.loadEnvironmentSettings = function () {
        var environmentSettingsURL = '/environmentSettings'
        if (location.hostname == 'localhost') {
          environmentSettingsURL = location.protocol + "//" + location.hostname + ":" + "3000" + "/environmentSettings"
        }
        console.log("environmentSettingsURL:" + environmentSettingsURL)
        $.get(environmentSettingsURL, function (data) {
          console.log("Load was performed." + JSON.stringify(data));
          self.CUSTOMER_PORTAL_URL = data.CUSTOMER_PORTAL_URL || 'http://localhost:8147/'
          self.PRODUCT_PORTAL_URL = data.PRODUCT_PORTAL_URL || 'http://localhost:8145/'
          self.FINANCE_PORTAL_URL = data.FINANCIAL_PORTAL_URL 
          self.LOYALTY_PORTAL_URL = data.LOYALTY_PORTAL_URL 
   });
      }
      self.globalContext = {}

      self.init = function () {
        self.globalContext.userName = "Not yet logged in";
        self.loadEnvironmentSettings()
      }
      $(document).ready(function () { self.init(); })


      self.addProductToBasket = function (selectedProduct) {
        if (self.globalContext.basket == null) {
          self.globalContext.basket = {}
        }
        if (self.globalContext.basket[selectedProduct] == null) {
          self.globalContext.basket[selectedProduct] = 1;
        } else {
          self.globalContext.basket[selectedProduct] = self.globalContext.basket[selectedProduct] + 1;
        }
        console.log("New composition of shopping basket: " + JSON.stringify(self.globalContext.basket))
        self.basketTitle("Your Shopping Basket: " + JSON.stringify(self.globalContext.basket))
      }


      self.sendGlobalContextToIFrame = function (iframe) {
        self.notifyIframe(iframe, {
          "eventType": "globalContext"
          , "payload": { "globalContext": self.globalContext }
        })
      }

      self.notifyIframe = function (iframe, message) {
        //productsIframe
        var iframe = $(iframe)
        if (iframe && iframe[0]) {
          var win = iframe[0].contentWindow;
          var targetOrigin = '*';
          win.postMessage(message, targetOrigin);
        } else {
          console.log("Could not send message to iframe at this moment")
        }
      }

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      // Router setup
      self.router = oj.Router.rootInstance;
      self.router.configure({
        'dashboard': { label: 'Dashboard', isDefault: true },
        'products': { label: 'Products' },
        'orders': { label: 'Orders' },
        'customers': { label: 'Customers' },
        'finance': { label: 'Financial Statements' },
        'loyalty': { label: 'Loyalty Program' }
      });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      // Navigation setup
      var navData = [
        {
          name: 'Home', id: 'dashboard', loggedInOnly: false,
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'
        },
        {
          name: 'Browse Catalog', id: 'products',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'
        },
        {
          name: 'Browse Orders', id: 'orders', loggedInOnly: true,
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-download-icon-24'
        },
        {
          name: 'Your Profile', id: 'customers', loggedInOnly: true,
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'
        },
        {
          name: 'Loyalty Status', id: 'loyalty', loggedInOnly: true,
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'
        },
        {
          name: 'Your Finance', id: 'finance',  loggedInOnly: true,
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-catalog-icon-24'
        }

      ];
      self.navDataSource = new oj.ArrayTableDataSource(navData, { idAttribute: 'id' });

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("Soaring through the Clouds Webshop Portal");
      self.basketTitle = ko.observable("Your shopping basket");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("Not yet logged in");
      self.userLoggedIn = ko.observable("N");

      self.enterShopbasket = function (event) {
        console.log("Show Basket")
      }

      //menu item handler
      self.menuItemAction = function (event) {
        var selectedMenuOption = event.path[0].id
        console.log(selectedMenuOption);
        if (selectedMenuOption == "sign") {
          if (self.userLoggedIn() == "N") {
            // navigate to the module that allows us to sign in
            oj.Router.rootInstance.go('customers');
          } else {
            // sign off
            self.userLogin("Not yet logged in");
            self.userLoggedIn("N");
            oj.Router.rootInstance.go('dashboard');
            self.globalContext.userName = "";

          }

        }
      };

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
