
var url=document.location.href;



var images= document.getElementsByTagName('img');
images=[].slice.call(images);
 console.log(images);

if( images ){
    
    images=images.filter( img => (img.width > 150) && (img.height > 150) ).map( img => {return {'src' : img.src} } );
    // eventPage.x({
    //     'images':images,
    //     'url':url
    // });


    console.log("console.log(images);",images);
    chrome.runtime.sendMessage({
        'images':[...images],
        'url':url
    });
    //Create Great Pics Folder
    // chrome.bookmarks.create({'parentId': bookmarkBar.id, 'title': 'Great Pics'},function(newFolder) {
        
    //     console.log("added folder: " + newFolder.title);
        
    //     //Create Page URL Folder
    //     chrome.bookmarks.create({'parentId': bookmarkBar.id, 'title': url},function(newFolder) {
            
    //         console.log("added folder: " + newFolder.title);
            
    //         //Create a bookmark
    //         images.forEeach( img => {
    //             chrome.bookmarks.create({'parentId': extensionsFolderId,
    //                         'title': domain + img.fullPath.split("/").pop(),
    //                         'url': img.src});
    //         });

    //     });

    // });
}