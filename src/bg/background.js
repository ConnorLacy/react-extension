//Install menu items to context menu when extension is installed
chrome.runtime.onInstalled.addListener((message) => {
    const context = [
        'page',
        'selection',
        'link',
        'editable',
        'image',
        'video',
        'audio',
    ]

    //Creating our clickable context menu item
    //When clicked, sends event to context script listening for messages
    chrome.contextMenus.create({
        title: 'Filter by duration',
        id: 'filter-by-duration',
        contexts: [...contexts, 'browser_action'],
    })
})

//Helper function. Accepts callback function. Gets the active tab and 
//sends it to the callback function
function getActiveTab(callback){
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const activeTab = tabs[0]
        callback(activeTab)
    })
}

//Listener for context menu click
chrome.contextMenus.onClicked.addListener((info) => {
    console.log(info)
    if (info.menuItemId === 'filter-by-duration'){
        getActiveTab((tab) => {
            if (info.menuItemId === 'filter-by-duration'){
                //Sends message which our App.js will receive
                chrome.tabs.sendMessage(tab.id, {
                    type: 'filter-by-duration',
                    ...info,
                })
            }
        })
    }
})

