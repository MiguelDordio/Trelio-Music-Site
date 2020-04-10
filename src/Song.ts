export class Song {
    id: string;
    name: string;
    preview_url: string;
    duration_ms: number;
    durantion_out: string;

    msToTime(ms: number) {
        var seconds: number = Number(Math.floor((ms % 60000) / 1000).toFixed(0));
        var minutes: number = Math.floor((ms / 60000));
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    
    getTracksDuration(topTracks: Song[]) {
        for (var i = 0; i < topTracks.length; i++) {
            topTracks[i].durantion_out = this.msToTime(topTracks[i].duration_ms);
        }
    }
}