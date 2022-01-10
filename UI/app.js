Dropzone.autoDiscover = false;


var fullName = [];
var statsTable= [];
var rows;
var personName;
        getStats();
       async function getStats(){
           const response = await fetch('NBA Player Stats.csv');
           const statTable = await response.text();

            rows = statTable.split('\n');
           rows.forEach(elt=> {
            const row = elt.split(',');
                 fullName.push(row[1]).toString();
                 statsTable.push(row.slice(2)).toString();
           });    
           //console.log(fullName);  
           console.log(statsTable);
       }

       

function init() {
    let dz = new Dropzone("#dropzone", {
        url: "/",
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Some Message",
        autoProcessQueue: false
    });
    
    dz.on("addedfile", function() {
        if (dz.files[1]!=null) {
            dz.removeFile(dz.files[0]);        
        }
    });

    dz.on("complete", function (file) {
        let imageData = file.dataURL;
        var url = "/api/classify_image";
        
        
        $.post(url, {
            image_data: file.dataURL
        },function(data, status) {
            
            //console.log(data);
            if (!data || data.length==0) {
                $("#resultHolder").hide();
                $("#titleHolder").hide();
                $("#statHolder").hide();
                $("#divClassTable").hide();                
                $("#error").show();
                return;
            }
            let players = ["bradley_beal", "giannis_antetokounmpo", "jayson_tatum", "kawhi_leonard", "kyrie_irving", "lebron_james", "luka_doncic", "nikola_jokic", "stephen_curry", "zion_williamson"];
            
            let match = null;
            let bestScore = -1;
            for (let i=0;i<data.length;++i) {
                let maxScoreForThisClass = Math.max(...data[i].class_probability);
                if(maxScoreForThisClass>bestScore) {
                    match = data[i];
                    bestScore = maxScoreForThisClass;
                }
            }
            checkNames();
            
            function checkNames(){
                getStats(); 
                for(i=0;i<rows.length;i++){
                    var x = fullName[i];
                    var isEqual = x == match.class;
                    console.log(match.class);
            
                   if (isEqual && typeof statsTable[i]!='undefined' && typeof statsTable[i]!== null) {
                        console.log(statsTable[i].length);
                        document.getElementById("titleHolder").innerHTML= JSON.stringify(statsTable[0]);
                        document.getElementById("statHolder").innerHTML= JSON.stringify(statsTable[i]);
                    }
                
                }
                    
                }


            if (match) {
                console.log(match);
                $("#error").hide();
                $("#resultHolder").show();
                $("#titleHolder").show();
                 $("#statHolder").show();
                $("#divClassTable").show();
                $("#resultHolder").html($(`[data-player="${match.class}"`).html());
                let classDictionary = match.class_dictionary;
                for(let personName in classDictionary) {
                    let index = classDictionary[personName];
                    let proabilityScore = match.class_probability[index];
                    let elementName = "#score_" + personName;
                    $(elementName).html(proabilityScore);
                    
                }
            }
            
                
            
            // dz.removeFile(file);            
        });
    });
    

    $("#submitBtn").on('click', function (e) {
        dz.processQueue();		
    });
}

$(document).ready(function() {
    console.log( "ready!" );
    $("#error").hide();
    $("#resultHolder").hide();
    $("#titleHolder").hide();
    $("#statHolder").hide();
    $("#divClassTable").hide();

    init();
});

