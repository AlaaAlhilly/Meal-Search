
function arrayOfEl(display,t){
    res=display;
    for(var n=0;n<t.length;n++){
      res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){
        return t[n][r];
      })
    }
      return res
    }
function displayVideo(){
    var display = `<div class="videoContainer">
    <h2>{{video}}</h2>
    <iframe class="rs view" width="640" height="360" src="//www.youtube.com/embed/{{videoId}}" frameborder="0" allowfullscreen>
    </iframe></div>`;
    return display;

}

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyAh9sn6135qdZ9ZxGV41J-_-bWC5tbGy5U');
}
 
$(document).on('click','.addVids',function() {
    $('.recipeList').hide();
    $('.recipeInfo').show();
    $('.vids').empty();
    
    $('.vids').append(`<button type="button" class="btn btn-primary back">Back</button>`);    
    var query = encodeURIComponent($(this).text()).replace(/%20/g, "+");
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q:query,
        type: 'video',
        maxResults: 6,
        order: 'viewCount',
        publishedAfter: '2015-01-01T00:00:00Z'
    });
    request.execute(searchVideos);
});
function searchVideos(response) {

    var videoResult = response.items;
    $.each(videoResult,function(index,item){
        $(".vids").append(arrayOfEl(displayVideo(), [{"video":item.snippet.title, "videoId":item.id.videoId}]));
    });
    resetHeight();
    $(window).on('resize',resetHeight);
}
function resetHeight(){
$('.rs').css('height',$('#targetRecepi').width() * 9/16);
}
$(document).on('click','.back',function(){
    $('.vids').empty();
    $('.article').empty();
    $('.recipeInfo').hide();
    $('.recipeList').show();
})