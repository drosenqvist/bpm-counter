const clicks = [],
      // Stores last 4 values used to get a more accurate avg
      avgArray = []

tempoCounter = (e) => {
  clicks.push(e)
  // Makes sure the array is always equal to the last 2 clicks
  clicks.length > 2 && clicks.shift()

  if (clicks.length > 1) {
    // Uses the time difference between the clicks, divides with a minute, which results in the BPM
    const bpm = Math.floor(60 / ((clicks[1].timeStamp - clicks[0].timeStamp) / 1000))

    avgArray.push(bpm)
    avgArray.length > 4 && avgArray.shift()

    let avgBpm = 0
    if (avgArray.length > 3) {
      avgArray.forEach(function(item) {
        avgBpm += item
      })

      // Divide the 4 BPMs with 4 to get the avg value
      avgBpm = Math.floor(avgBpm / 4)
    }

    tempoBtn.textContent = `${avgBpm ? avgBpm : bpm } bpm` 
  } else {
    // Provides feedback after only one click; two clicks are needed for a BPM value to appear
    tempoBtn.textContent = 'One More Time'
  }
}

const tempoBtn = document.querySelector('.tempo-button')
      tempoBtn.addEventListener('click', function (e) {
        tempoCounter(e)
      })