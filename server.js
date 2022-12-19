// StAuth10222: I Hruthvik Chokshi, 000813765 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/auctioneer",function(req,res){
   res.sendFile(__dirname + "/auctioneer.html");
});

app.get("/bidder",function(req,res){
    res.sendFile(__dirname + "/bidder.html");
});

io.on("connection",function(socket){
        console.log("CONNECTION");
        
        socket.on("submititem", function(itemdata){
            socket.broadcast.emit("bidstart",itemdata.itemname,itemdata.price,itemdata.timelimit,itemdata.hb,itemdata.hbp);
            console.log(itemdata);
        });

        socket.on("username", function(bidderdata){
            console.log(bidderdata);
        });
        socket.on("sendbid", function(biddata){
            io.emit("bcidding",biddata.biddername,biddata.priceupdate);
            console.log(biddata);
        });
        
});

http.listen(3000);
