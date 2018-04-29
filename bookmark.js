// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    

    console.log("Extension Clicked.");

    var url=tab.url;//window.location.href;
    console.log('Turning ' + url + ' red!');

    var domain = `http://xyz${url}xxxx`;
    
    var imges= document.getElementsByName('img');
    imges=imges.filter( img => (img.attr('width') > 150) && (img.attr('height') > 150) );

    //Create Great Pics Folder
    chrome.bookmarks.create({'parentId': bookmarkBar.id, 'title': 'Great Pics'},function(newFolder) {
        
        console.log("added folder: " + newFolder.title);
        
        //Create Page URL Folder
        chrome.bookmarks.create({'parentId': bookmarkBar.id, 'title': url},function(newFolder) {
            
            console.log("added folder: " + newFolder.title);
            
            //Create a bookmark
            imges.forEeach( img => {
                chrome.bookmarks.create({'parentId': extensionsFolderId,
                               'title': domain + img.fullPath.split("/").pop(),
                               'url': img.src});
            });

        });
    });
});
  



// chrome.runtime.onInstalled.addListener(function() {
// //   chrome.storage.sync.set({color: '#3aa757'}, function() {
// //     console.log("The color is green.");
// //   });
    
// });