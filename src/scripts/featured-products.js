$(function () {

    var widget = $('#featured-products');
    if (!widget.length) {
        return false
    }

    initFeaturedProducts();

    function initFeaturedProducts() {
        $.getJSON({
            url: widget.data('collection-url') + '/products.json',
            success: function (data) {
                initWidget(formatProducts(data));
            }
        })
    }

    function formatProducts(data) {
        var resultProducts = {all: []};
        data.products.forEach(function (item) {
            if (item.product_type !== '') {
                if (!resultProducts[item.product_type]) {
                    resultProducts[item.product_type] = [];
                }

                var itemPrice = getItemPrice(item);
                var itemComparePrice = getItemComparePrice(item);
                if (item.images.length) {
                    item.thumbnail = slate.Image.getSizedImageUrl(item.images[0].src, '600x');
                } else {
                    item.thumbnail = '';
                }

                item.isSale = itemComparePrice > itemPrice;
                item.formatedPrice = '$' + itemPrice;
                item.comparePrice = '$' + itemComparePrice;

                resultProducts['all'].push(item);
                resultProducts[item.product_type].push(item);
            }
        });
        for (var cat in resultProducts) {
            resultProducts[cat] = resultProducts[cat].slice(0, 10);
        }
        return resultProducts;
    }

    function initWidget(data) {

        var dataCatList = widget.data('cat-list');
        var categoriesList = ['all'];

        if (dataCatList !== "") {
            categoriesList = categoriesList.concat(dataCatList.split(','));
        } else {
            for (var cat in data) {
                if (cat !== 'all') {
                    categoriesList.push(cat);
                }
            }
        }

        var sliderConfig = {
            speed: 800,
            prevArrow: '<button type="button" class="slider-btn slider-btn--prev"></button>',
            nextArrow: '<button type="button" class="slider-btn slider-btn--next"></button>'
        };

        new Vue({
            el: '#featured-products',
            data: {
                productData: data,
                currentCat: 'all',
                categoriesList: categoriesList
            },
            mounted: function () {
                this.slider = $(this.$refs.slider);
                this.slider.slick(sliderConfig);
                this.slider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
                    this.setCatAfterSlideChnage(nextSlide)
                }.bind(this));

            },
            methods: {
                setCurrentCat: function (id) {
                    this.currentCat = id;
                },
                slideToCat: function (id) {
                    this.setCurrentCat(id);
                    var slideIndex = this.categoriesList.indexOf(this.currentCat);
                    this.slider.slick('slickGoTo', slideIndex);
                },
                setCatAfterSlideChnage: function (index) {
                    this.setCurrentCat(this.categoriesList[index]);
                }
            }
        })
    }

    function getItemPrice(item) {
        return Math.min.apply(null, item.variants.map(function (item) {
            return item.price
        }));
    }

    function getItemComparePrice(item) {
        return Math.max.apply(null, item.variants.map(function (item) {
            return item.compare_at_price === null ? 0 : item.compare_at_price
        }));
    }
});