$(function () {
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    blogArticles = blogArticles.map(function(item){
        var currentDate = new Date(item.created_at);
        item.formatedDate = currentDate.getDay() + ' ' + month[currentDate.getMonth()] + ' ' + currentDate.getFullYear();
        item.image.src = slate.Image.getSizedImageUrl(item.image.src, '600x');

        return item;
    });

    new Vue({
        el: '#articles-list',
        data: {
            showed:12,
            perPage:6,
            articles: blogArticles
        },
        methods:{
            showMore: function(){
                this.showed += this.perPage;
            }
        }
    });
});