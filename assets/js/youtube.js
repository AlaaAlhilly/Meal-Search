
function arrayOfEl(display,objects){
    res=display;
    for(var i=0;i<objects.length;i++){
      res=res.replace(/\{\{(.*?)\}\}/g,function(e,item){
        return objects[i][item];
      })
    }
      return res
    }
function displayVideo(){
    var display = `<div style="margin:15px auto" class="videoContainer">
    <h2>{{video}}</h2>
    <iframe  width="100%" height="400" src="//www.youtube.com/embed/{{videoId}}" frameborder="0" allowfullscreen>
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
    var query = encodeURIComponent('how to make '+$(this).attr('link-data')).replace(/%20/g, "+");
    debugger
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
        $(".vids").append(arrayOfEl(displayVideo(), [{"videoId":item.id.videoId,"video":item.snippet.title}]));
    });
    resetHeight();
    $(window).on('resize',resetHeight);
}
function resetHeight(){
$('.rs').css('height',$('#targetRecipe').width() * 9/16);
}
$(document).on('click','.back',function(){
    $('.vids').empty();
    $('.article').empty();
    $('.recipeInfo').hide();
    $('.recipeList').show();
})