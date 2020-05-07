const delay =ms=>{
    return new Promise(r=>setTimeout(()=>r(),ms))
};


const url='https://jsonplaceholder.typicode.com/todos/1';
const all = 'http://aumsuhere.tmweb.ru/api/db/view_routers';
const add = 'http://aumsuhere.tmweb.ru/api/db/add_router';
// function fetchTo() {
//    return delay(2000).then(()=>{
//       return  fetch(all)
//    })
//        .then(response=>response.json())
// }
// fetchTo()
//     .then(data => {
//         console.log('data',data[0].lat)
//     // })

// async function fetcAsync() {
//     const reponse = await fetch(all);
//     const data = await reponse.json();
//     // console.log(data);
//     let lng = data[0].lat;
//     return lng
// }


const lng = async (all) =>{
    const res = await fetch(all);
    const data = await res.json();
    return data;
};

lng('http://aumsuhere.tmweb.ru/api/db/view_routers')
    .then((data)=>{
        console.log(data)
    });


//------------------------------------------------------------------------------------------

 // Initialize the platform object:
    var platform = new H.service.Platform({
        'apikey': '5guKdiSP9g3xCXY8sRbbea5KHsevzf_ytrnLQeJPSvM'
    });

    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
        document.getElementById('mapContainer'),
        maptypes.vector.normal.map,
        {
            zoom: 10,
            center: { lng:37.7575 , lat: 44.7236 }
        });


function addMarkersToMap(map) {

       // var berlinMarker = new H.map.Marker({lat:52.5166, lng:13.3833});
	   var berlinMarker = new H.map.Marker({lng:37.7575 , lat: 44.7236});
        map.addObject(berlinMarker);

		var xhr = new XMLHttpRequest();
		// 2. Конфигурируем его: GET-запрос на URL
    xhr.open('GET', all, false);
		// 3. Отсылаем запрос
		xhr.send();
		// 4. Если код ответа сервера не 200, то это ошибка
		if (xhr.status != 200) {
		  // обработать ошибку
		  alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
		} else {

		  var jsonData = JSON.parse(xhr.responseText); // responseText -- текст ответа.
			for (var i = 0; i < jsonData.length; i++) {
				var counter = jsonData[i];
				//console.log(counter.Type);
				berlinMarker = new H.map.Marker({lng:counter.lng, lat:counter.lat});
				map.addObject(berlinMarker);
			}


		}



    }

function addPolylineToMap(map) {
    var lineString = new H.geo.LineString();

    lineString.pushPoint({lat:44.7256, lng:37.7591});
    lineString.pushPoint({lat:44.7236, lng:37.7575});

    map.addObject(new H.map.Polyline(
        lineString, { style: { lineWidth: 4 }}
    ));
}

    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    window.onload = function () {
        addMarkersToMap(map);
        addPolylineToMap(map);
    }


