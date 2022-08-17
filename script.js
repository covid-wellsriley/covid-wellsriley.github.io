$( document ).ready(function() {
    $.each(data, function(key, values) {
        $.each(values, function(i, f) {
            var option = "<option value='" + f.value + "'" + (i==0?" selected":"") + ">" + f.name + "</option>";
            $(option).insertBefore(`#${key}Custom`);
                const select=$(`#${key}Select`);
                const value=$(`#${key}Val`);
                const range=$(`#${key}Range`);
                range.val(values[0].value);
                value.text(values[0].value);
                select.on( "change", function(event) {
                    if(event.target.value!="custom"){
                        value.text(event.target.value);
                        range.val(event.target.value);
                        range.attr('disabled','true');
                    }
                    else range.removeAttr("disabled");
                });
                select.on( "input", function() {
                    value.text(range.val());
                });
        });
    });
        
    $.each(pathogen, function(i, f) {
        var option = "<option value='" + i + "'>" + f.name + "</option>";
        $("#pathogenSelect").append(option);
    });
        $("#pathogenSelect").on("change", function() {
            if ($("#pathogenSelect").val()==0) {
                $("#quantaEffectSection").removeAttr('hidden');
                $("#quantaProdSelect").empty();
                option="<option id='quantaProdCustom' value='custom'>Custom</option>";
                $("#quantaProdSelect").append(option);
                values = pathogen[$("#pathogenSelect").val()].data;
                option = "<option value='" + values.resting + "' selected>" + "Resting - Oral breathing</option>"
                $(option).insertBefore("#quantaProdCustom");
                option = "<option value='" + values.activity + "'>" + "Light activity - Speaking</option>"
                $(option).insertBefore("#quantaProdCustom");
                option = "<option value='" + values.activity2 + "'>" + "Light activity - Loudly speaking</option>"
                $(option).insertBefore("#quantaProdCustom");
                option = "<option value='" + values.heavyactivity + "'>" + "Heavy activity - Oral breathing</option>"
                $(option).insertBefore("#quantaProdCustom");
                $("#quantaProdVal").text(values.resting)
            }
            else {
                $("#quantaEffectSection").attr('hidden','true');
                $("#quantaEffectSelect").val("1");
                $("#quantaEffectVal").text("1");
                $("#quantaProdSelect").empty();
                option="<option id='quantaProdCustom' value='custom'>Custom</option>";
                $("#quantaProdSelect").append(option);
                values = pathogen[$("#pathogenSelect").val()].data;
                option = "<option value='" + values.resting + "' selected>" + "Resting - Oral breathing</option>"
                $(option).insertBefore("#quantaProdCustom");
                option = "<option value='" + values.standing + "'>" + "Standing - Speaking</option>"
                $(option).insertBefore("#quantaProdCustom");
                option = "<option value='" + values.activity + "'>" + "Light activity - Loudly speaking</option>"
                $(option).insertBefore("#quantaProdCustom");
                $("#quantaProdVal").text(values.resting)
            }
        });
        $("#decompRange").on( "input", function() {
            $("#decompVal").text($("#decompRange").val());
        });

    $(".input").change(function(){
        calcProducts();
    });
    calcProducts();
});



 function calculate() {
    return new Promise(function(resolve, reject) {
       var i = parseFloat($("#inputNumInfectants").val());
       var p = parseFloat($("#breathRateVal").text());
       var q = parseFloat($("#quantaProdVal").text());
       var t = parseFloat($("#inputExposureTime").val());
       var variantEff = parseFloat($("#quantaEffectVal").text());
       var V = parseFloat($("#inputRoomHeight").val())*parseFloat($("#inputRoomArea").val());
       var ACH_v = parseFloat($("#ventilationVal").text());
       var ACH_d = parseFloat($("#decompVal").text());
       var desired_prob = parseFloat($("#percentInput").val());
       var eqACH = (-i*p*q*t*variantEff/V)/(Math.log(1-(desired_prob/100)))-(ACH_v+ACH_d);

       if (eqACH<0) eqACH = 0;

       const ctx = document.getElementById('chart');
       Chart.helpers.each(Chart.instances, function(instance){
          instance.destroy();
       });
       const myChart = new Chart(ctx, {
          type: 'line',
          data: {
             labels: [...Array(26).keys()],
             datasets: [{
                label: '',
                data: Array.from(Array(26), (_, index) => 100*(1-Math.exp((-i*p*q*t*variantEff/V)/(ACH_v+ACH_d+index)))),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.6
             }]
          },
          options: {
             plugins: {
                legend: {
                   display: false
                },
             },
             scales: {
                y: {
                   beginAtZero: true,
                   title: {
                      display: true,
                      text: "Probability of Infection (%)"
                   }
                },
                x: {
                   title: {
                      display: true,
                      text: "Additional eqACH"
                   }
                }
             }
          }
       });

       resolve(eqACH);
    });
 }

 function calcProducts(){
    calculate().then(function (result) {
       if(!isNaN(result)){
          console.log(result)
          if(result>100){
             $("#outOfRange").removeAttr('hidden');
             $("#noRecommendation").attr('hidden','true');

             $("#output").text(result.toFixed(2));
             $("#ceilProd").attr('hidden','true');
             $("#wallProd").attr('hidden','true');
             $("#smallProd").attr('hidden','true');
             $("#midProd").attr('hidden','true');
             $("#bigProd").attr('hidden','true');
          }
          else if(result==0){
             $("#noRecommendation").removeAttr('hidden');
             $("#outOfRange").attr('hidden','true');
             $("#output").text(result.toFixed(2));
             $("#ceilProd").attr('hidden','true');
             $("#wallProd").attr('hidden','true');
             $("#smallProd").attr('hidden','true');
             $("#midProd").attr('hidden','true');
             $("#bigProd").attr('hidden','true');
          }
          else{
             $("#output").text(result.toFixed(2));
 
             var roomVol = parseFloat($("#inputRoomHeight").val())*parseFloat($("#inputRoomArea").val());

             var upperEqACH = (2000)/(roomVol);
             var bigEqACH = (380)/(roomVol);
             var midEqACH = (220)/(roomVol);
             var smallEqACH = (240)/(roomVol);
             var upperNum = 0;
             var totalEqACH = result;

             if($("#inputRoomHeight").val()>=2.5){
                upperNum = Math.ceil(totalEqACH/upperEqACH);

                if(upperNum<10){
                   var upperTotal = upperNum * upperEqACH;
                   var upperTime = (-Math.log(1/10000)/upperTotal)*60;

                   $("#ceilNum").text(upperNum);
                   $("#wallNum").text(upperNum);
                   $("#ceilEqACH").text(upperTotal.toFixed(2));
                   $("#wallEqACH").text(upperTotal.toFixed(2));
                   $("#ceilTime").text(upperTime.toFixed(2));
                   $("#wallTime").text(upperTime.toFixed(2));
                   $("#ceilProd").removeAttr('hidden');
                   $("#wallProd").removeAttr('hidden');
                }
                else{
                   $("#ceilProd").attr('hidden','true');
                   $("#wallProd").attr('hidden','true');
                }
             }
             else {
                $("#ceilProd").attr('hidden','true');
                $("#wallProd").attr('hidden','true');
             }

             var bigNum = Math.ceil(totalEqACH/bigEqACH);
             if(bigNum<10){
                var bigTotal = bigNum * bigEqACH;
                var bigTime = (-Math.log(1/10000)/bigTotal)*60;
                $("#bigNum").text(bigNum);
                $("#bigEqACH").text(bigTotal.toFixed(2));
                $("#bigTime").text(bigTime.toFixed(2));
                $("#bigProd").removeAttr('hidden');
             }
             else $("#bigProd").attr('hidden','true');

             var midNum = Math.ceil(totalEqACH/midEqACH);
             if(midNum<10){
                var midTotal = midNum * midEqACH;
                var midTime = (-Math.log(1/10000)/midTotal)*60;
                $("#midNum").text(midNum);
                $("#midEqACH").text(midTotal.toFixed(2));
                $("#midTime").text(midTime.toFixed(2));
                $("#midProd").removeAttr('hidden');
             }
             else $("#midProd").attr('hidden','true');

             var smallNum = Math.ceil(totalEqACH/smallEqACH);
             if(smallNum<10){
                var smallTotal = smallNum * smallEqACH;
                var smallTime = (-Math.log(1/10000)/smallTotal)*60;
                $("#smallNum").text(smallNum);
                $("#smallEqACH").text(smallTotal.toFixed(2));
                $("#smallTime").text(smallTime.toFixed(2));
                $("#smallProd").removeAttr('hidden');
             }
             else $("#smallProd").attr('hidden','true');
          }
       }
    })
 }