/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

 // give it a look jasmine document,  https://jasmine.github.io/2.2/introduction

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('All URL in Feeds are defined', function(){
           for(var feed in allFeeds){
             expect(allFeeds[feed].url).toBeDefined();
             expect(allFeeds[feed].url).not.toBe(0);
             expect(allFeeds[feed].url).not.toEqual('');
           }
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('All Feeds has names and they are not empty', function(){
           for(var feed in allFeeds){
             expect(allFeeds[feed].name).toBeDefined();
             expect(allFeeds[feed].name).not.toBe(0);
             expect(typeof allFeeds[feed].name).toBe("string");
           }
         });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function(){

        //I got the idea from theis link https://stackoverflow.com/questions/31590552/jasmine-jquery-check-if-element-is-visible


          /* TODO: Write a test that ensures the menu element is
           * hidden by default. You'll have to analyze the HTML and
           * the CSS to determine how we're performing the
           * hiding/showing of the menu element.
           */
           it('The menu element in the body class is hidden by default', function(){
             expect($('.menu-hidden').is(':visible')).toBe(true);
           });

           /* TODO: Write a test that ensures the menu changes
            * visibility when the menu icon is clicked. This test
            * should have two expectations: does the menu display when
            * clicked and does it hide when clicked again.
            */
            it('Test the menu visibility when menu icon clicked',function(){
              $('.menu-icon-link').click();
              expect($('.menu-hidden').is(':visible')).toBe(false);
              $('.menu-icon-link').click();
              expect($('.menu-hidden').is(':visible')).toBe(true);
            });
    });

/* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){


          /* TODO: Write a test that ensures when the loadFeed
           * function is called and completes its work, there is at least
           * a single .entry element within the .feed container.
           * Remember, loadFeed() is asynchronous so this test will require
           * the use of Jasmine's beforeEach and asynchronous done() function.
           */

           beforeEach(function(done){
             loadFeed(0, function(){
               done();
             });
           });
           it('LoadFeed function should has at least one entry in Feed container', function(done){
             var entryInput = $('.entry').length;
             expect(entryInput).toBeGreaterThan(0);
            // expect($('.feed .entry').length).toBeGreaterThan(0);
             done();
           });

    });

/* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed selection', function(){
      /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
       var firstLoad;
       beforeEach(function(done){
         loadFeed(0,function(){
          //  firstLoad = $('.feed').html();
          firstLoad = document.querySelector('.feed').innerHTML;
           loadFeed(1, done);
         });
       });

       it('see the changes in the loaded content', function(done){
         expect($('.feed').html()).not.toEqual(firstLoad);
         done();
       });
    });



}());
