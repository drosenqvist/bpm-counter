const clicks = [],
      // Stores last 4 values used to get a more accurate average
      averageArray = []

tempoCounter = (e) => {
  clicks.push(e)
  // Makes sure the array is always equal to the last 2 clicks
  clicks.length > 2 && clicks.shift()

  if (clicks.length > 1) {
    // Uses the time difference between the clicks, divides with a minute, which results in the BPM
    const bpm = Math.floor(60 / ((clicks[1].timeStamp - clicks[0].timeStamp) / 1000))

    averageArray.push(bpm)
    averageArray.length > 4 && averageArray.shift()

    let averageBpm = 0
    if (averageArray.length > 3) {
      averageArray.forEach(function (item) {
        averageBpm += item
      })

      // Divide the 4 BPMs with 4 to get the average value
      averageBpm = Math.floor(averageBpm / 4)
    }

    tempoBtn.textContent = `${averageBpm ? averageBpm : bpm } bpm` 
  } else {
    // Provides feedback after only one click; two clicks are needed for a BPM value to appear
    tempoBtn.textContent = 'One More Time'
  }
}


const tempoBtn = document.querySelector('.tempo-button')
      tempoBtn.addEventListener('click', function (e) {
        // Since we need the timestamp of the click, we pass the event
        tempoCounter(e)
      })