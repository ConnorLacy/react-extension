/*global chrome*/
import React from 'react';

const convertToMs = (ms, type) => {
  switch (type) {
    case 'seconds':
      return ms * 1000
    case 'minutes':
      return ms * 60000
    case 'hours':
      return ms * 36000000
    default:
      break
  }
}

function App() {

  function filterByDuration(duration){
    return() => {
      const container = document.querySelector(
        '#contents.style-scope.ytd-item-section-renderer',
      )
      const elementList = container.querySelectorAll('ytd-video-renderer')
      elementList.forEach((element) => {
        const durationElement = element.querySelector('span.style-scope.ytd-thumbnail-overlay-time-status-renderer',)
        if (durationElement) {
          let durationTime = durationElement.innerHTML.trim()
          const durationParts = durationTime.split(':')
          let hour = 0
          let min = 0
          let sec = 0
          switch(durationParts.length){
            case 2:
              min = Number(durationParts[0])
              sec = Number(durationParts[1])
              break
            case 3:
              hour = Number(durationParts[0])
              min = Number(durationParts[1])
              sec = Number(durationParts[3])
              break
            default:
              break
          }
          let currentDurationInMs = convertToMs(hour, 'hours')
          currentDurationInMs += convertToMs(min, 'minutes')
          currentDurationInMs += convertToMs(sec, 'seconds')
          const minMs = convertToMs(duration.min, 'minutes')
          const maxMs = convertToMs(duration.max, 'minutes')
          if( currentDurationInMs < minMs || currentDurationInMs > maxMs){
            element.parentNode.removeChild(element)
          }
        }
      })
    }
  }

  //useEffect is a callback function that is executed 
  //after the component renders
  React.useEffect(() => {
    //Listens for messages from background script
    chrome.runtime.onMessage.addListener((action) => {
      switch (action.type){
        case 'filter-by-duration': {
          console.log('Received click event from context menu')
          break
        }
        default:
          break
      }
    })
  }, [])

  return null
}

export default App;
