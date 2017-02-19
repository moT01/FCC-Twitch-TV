$(document).ready(function () {
    'use strict';
    
    var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
    
    streamers.forEach(function (channel) {
    
        var channelurl = "https://wind-bow.gomix.me/twitch-api/channels/" + channel,
            streamurl = "https://wind-bow.gomix.me/twitch-api/streams/" + channel;
 
        $.getJSON(streamurl, {format: 'json'}, function (twitchstream) {
            var name, preview, url, status, logo;
            
            if (twitchstream.stream === null) {
                $.getJSON(channelurl, {format: 'json'}, function (twitchchannel) {
                    if (twitchchannel.error !== "Not Found") {
                        name = twitchchannel.display_name;
                        preview = twitchchannel.profile_banner;
                        logo = twitchchannel.logo;
                        url = "https://www.twitch.tv/" + channel;
                        $(".offline").append("<div class=\"channel-wrap\"><div class=\"channel\"><a href=\"" + url + "\" target=\"_blank\"><img class=\"preview\" src=\"" + preview + "\" alt=\"⊠\"><img class=\"logo\" src=\"" + logo + "\"><p>" + name + "</p><hr><p>OFFLINE</p></a></div></div>");
                    } else { //twitchchannel.error === "Not Found"
                        $(".closed").append("<div class=\"channel-wrap\"><div class=\"channel\"><div class=\"preview\">⊠</div><p>" + channel + "</p><hr><p>This channel has been closed.</p></div></div>");
                    }
                }); //end .getJSON (twitchuser)   
            } //end if (twitchstream.stream === null)
            
            if (twitchstream.stream !== null && twitchstream.stream !== undefined) {
                name = twitchstream.stream.channel.display_name;
                preview = twitchstream.stream.preview.large;
                url = twitchstream.stream.channel.url;
                status = twitchstream.stream.channel.status;
                logo = twitchstream.stream.channel.logo;

                $(".online").append("<div class=\"channel-wrap\"><div class=\"channel\"><a href=\"" + url + "\" target=\"_blank\"><img class=\"preview\" src=\"" + preview + "\"><img class=\"logo\" src=\"" + logo + "\"><p>" + name + "</p><hr><p>" + status + "</p></a></div></div>");
            } //end if (twitchstream.stream !== (null || undefined))
        }); //end .getJSON (streamurl)
    }); //end .foreach
}); //end document.ready