---
layout: page
title: Raid Team
raiders: ["Bigchap", "Zomgqq", "Alastar", "Tresane", "Cptkrunk", "Skifree", "Eredesse", "Dragonheart", "Evgenimalkin", "Maknasty", "Wootman", "Cimba", "Flarez", "Irregularity", "Crians", "Shiftless"]
---

{% assign sorted_raiders = page.raiders | sort %}

<script type="text/javascript" id="myjsonp"></script>
<script type="text/javascript">
    function getToon(obj) {
        var raiders = ["Bigchap", "Zomgqq", "Alastar", "Tresane", "Cptkrunk", "Skifree", "Eredesse", "Dragonheart", "Evgenimalkin", "Maknasty", 
                        "Wootman", "Cimba", "Flarez", "Irregularity", "Crians", "Shiftless"];
        for (var index = 0; index < raiders.length; index++) {
            for (var yndex = 0; yndex < obj.members.length; yndex++) {
                if (raiders[index] == obj.members[yndex].character.name) {
                    var id = raiders[index];
                    document.getElementById("avatar" + id).src = "https://us.battle.net/static-render/us/" + obj.members[yndex].character.thumbnail;
                    document.getElementById("name" + id).innerHTML = obj.members[yndex].character.name;
                    document.getElementById("specClass" + id).innerHTML = obj.members[yndex].character.spec.name + " ";

                    if (obj.members[yndex].character.class == "1") { document.getElementById("specClass" + id).innerHTML += "Warrior"; }
                    if (obj.members[yndex].character.class == "2") { document.getElementById("specClass" + id).innerHTML += "Paladin"; }
                    if (obj.members[yndex].character.class == "3") { document.getElementById("specClass" + id).innerHTML += "Hunter"; }
                    if (obj.members[yndex].character.class == "4") { document.getElementById("specClass" + id).innerHTML += "Rogue"; }
                    if (obj.members[yndex].character.class == "5") { document.getElementById("specClass" + id).innerHTML += "Priest"; }
                    if (obj.members[yndex].character.class == "6") { document.getElementById("specClass" + id).innerHTML += "Death Knight"; }
                    if (obj.members[yndex].character.class == "7") { document.getElementById("specClass" + id).innerHTML += "Shaman"; }
                    if (obj.members[yndex].character.class == "8") { document.getElementById("specClass" + id).innerHTML += "Mage"; }
                    if (obj.members[yndex].character.class == "9") { document.getElementById("specClass" + id).innerHTML += "Warlock"; }
                    if (obj.members[yndex].character.class == "10") { document.getElementById("specClass" + id).innerHTML += "Monk"; }
                    if (obj.members[yndex].character.class == "11") { document.getElementById("specClass" + id).innerHTML += "Druid"; }
                }
            }
        }

    }
    window.onload = function() {
        var url = "http://us.battle.net/api/wow/guild/Boulderfist/Dragon%20Knight?fields=members&jsonp=getToon";
        document.getElementById("myjsonp").src = url;
    }
</script>

{% for raider in sorted_raiders %}
<div class="col-md-8 col-md-offset-2">                
    <div>
        <img id="avatar{{ raider }}"></img>
    </div>
    <div>
        <h3 class="post-title" id="name{{ raider }}"></h3>
        <a id="armory{{ raider}}" href="http://us.battle.net/wow/en/character/boulderfist/Bigchap/simple">
            <p id="specClass{{ raider }}">{{ raider }}</p>
        </a>
    </div>
</div>
{% endfor %}
