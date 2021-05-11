'use strict'
//process.env.DEBUG = "slsk:*"

var path = require('path')
const slsk = require('slsk-client')

slsk.connect({
  user: '',
  pass: ''
}, (err, client) => {
    if (err) return console.log(err)
        
    var searches = [
        {"author": "Random Factor", "song": "Convergence"}
    ]
    
    for(var search in searches) {
        search = searches[search]
        console.log("search: " + JSON.stringify(search))
        
        client.search({
            req: search.author + " " + search.song,
            timeout: 2000
        }, (err, res) => {
            if (err) return console.log(err)
            
            for(var i in res) {
                if(res[i].bitrate > 0 && res[i].bitrate < 321 && i == 0) {
                    var file = res[i].file.split("\\")
                    var size = Math.round(res[i].size / Math.pow(1024,2)) + "M"
                    var bitrate = res[i].bitrate + "Kbps"
                    var eta = Math.round(res[i].size / res[i].speed) + " secs at " + Math.round(res[i].speed / 1024) + "Kbps"
                    console.log(i + ") " + file[file.length - 1])
                    console.log(bitrate + " - " + size + " - " + eta)
                }
            }

///*
            client.download({
                file: res[0],
                path: __dirname + '/random.mp3'
            }, (err, data) => {
                //can res.send(data.buffer) if you use express
                console.log("done")
                process.exit()
            })
//*/
        
        })
                
    }

})