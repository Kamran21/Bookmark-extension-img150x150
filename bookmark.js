// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Called when the user clicks on the browser action.



chrome.browserAction.onClicked.addListener(function(tab) {
    
    console.log("Extension Clicked.");
    chrome.tabs.executeScript(null, {"file": "app.js"});//.then(onExecuted,onError);

// var url=document.location.href;

    chrome.runtime.onMessage.addListener(function(data) {
        
        console.log("data",data);

        ///////////////////////////////////////////
        
        const addBookmarks = id => {
            
            //Create Great Pics Folder
            chrome.bookmarks.create({'parentId': id, 'title': 'Great Pics'},function(newFolder) {
                
                console.log("added folder: " + newFolder);
                
                //Create Page URL Folder
                chrome.bookmarks.create({'parentId': newFolder.id, 'title': data.url},function(newFolder) {
                    
                    console.log("added folder: " + newFolder.title);
                    
                    //Create a bookmark
                    data.images.forEach( img => {
                        chrome.bookmarks.create({'parentId': newFolder.id,
                                    'title': img.src,
                                    'url': img.src});
                    });

                });

            });

        };

        function findBookmarksBar(id, folderName) {

            chrome.bookmarks.getChildren(id, function(children) {
                for (var i = 0; i < children.length; i++) {
                    var bookmark = children[i];
                    console.log(bookmark);
                    console.debug(bookmark.title);
                    if (bookmark.title == folderName) {
                        addBookmarks(bookmark.id);
                        return;
                    }
                }
            });

        }
        // addBookmarks('1');
        findBookmarksBar('0','Bookmarks bar');  // root folder
        
    });

});
  



// chrome.runtime.onInstalled.addListener(function() {
// //   chrome.storage.sync.set({color: '#3aa757'}, function() {
// //     console.log("The color is green.");
// //   });
    
// });