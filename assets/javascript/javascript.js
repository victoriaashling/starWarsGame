$(document).ready(function() {

    var avatars = [
        {name: "porg", val: 100, attack: 5, improvedAttack: 0},
        {name: "ewok", val: 120, attack: 8, improvedAttack: 0},
        {name: "jawa", val: 150, attack: 20, improvedAttack: 0},
        {name: "wookie", val: 180, attack: 25, improvedAttack: 0}
    ]

    var currentPlayer;
    var currentDefender;


    function displayChoices() {
        // alert("displayChoices()");
        $("#porg").val(100);
        $("#porg-val").text(porg.value);
        $("#porg").detach().show().appendTo("#chooseChar");
        avatars[0].improvedAttack = 0;

        $("#ewok").val(120);
        $("#ewok-val").text(ewok.value);
        $("#ewok").detach().show().appendTo("#chooseChar");
        avatars[1].improvedAttack = 0;

        $("#jawa").val(150);
        $("#jawa-val").text(jawa.value);
        $("#jawa").detach().show().appendTo("#chooseChar");
        avatars[2].improvedAttack = 0;

        $("#wookie").val(180);
        $("#wookie-val").text(wookie.value);
        $("#wookie").detach().show().appendTo("#chooseChar");
        avatars[3].improvedAttack = 0;
    }

    displayChoices();

    enemyIsDead = true;
    $("#restart").hide();

    $(".avatar").click( function() {
        if ($("#playerChar").is(":empty")) {
            currentPlayer = this.id;
            $(this).detach().appendTo("#playerChar").css({backgroundColor: "green"});
            $(".avatar").not(this).detach().appendTo("#enemies").css({backgroundColor: "black", color: "white"});
        }
        else {
            if (enemyIsDead) {
                $(this).detach().appendTo("#defender").css({backgroundColor: "red", color: "black"}); 
                currentDefender = this.id;
                enemyIsDead = false;
                $("#damage-stats").empty();
            }
        }
    });

    // $("#playerChar").click(function() {
    //     if ($("#enemies").is(":empty")) {
    //         displayChoices();
    //         currentPlayer = "";
    //     }   
    // })

    $("#attack").click( function() {
        if ( ( $("#" + currentPlayer).val() > 0 ) && ( $("#" + currentDefender).val() > 0 ) ) {
            for (var i = 0; i < avatars.length; i++) {
                if (avatars[i].name == currentPlayer) {
                    avatars[i].improvedAttack = avatars[i].attack + avatars[i].improvedAttack;
                    $("#" + currentDefender).val( $("#" + currentDefender).val() - avatars[i].improvedAttack );
                    $("#" + currentDefender + "-val").text( $("#" + currentDefender).val() );
                    $("#damage-stats").text( "You have attacked the " + currentDefender + " for " + avatars[i].improvedAttack + " points of health damage." );


                    
                    if ( $("#" + currentDefender).val() < 1 ) {
                        $("#" + currentDefender).detach().hide().appendTo("#chooseChar");
                        $("#damage-stats").text("You have defeated the " + currentDefender + "! Please chose your next opponent.")
                        currentDefender = "";
                        enemyIsDead = true;


                        if ( $("#enemies").is(":empty") ) {
                            $("#damage-stats").text("You win!! Click the button to restart.");
                            $("#restart").show();
                        }
                    }
                    else {
                        for (var j = 0; j < avatars.length; j++) {
                            if (avatars[j].name == currentDefender) {
                                $("#" + currentPlayer).val( $("#" + currentPlayer).val() - avatars[j].attack );
                                $("#" + currentPlayer + "-val").text( $("#" + currentPlayer).val() );
                                $("#damage-stats").append( "<br>The " + currentDefender + " has attacked you for " + avatars[j].attack + " points of health damage." );
                            }
                        }
                    };

                    if ( $("#" + currentPlayer).val() < 1 ) {
                        $("#damage-stats").text("You Lose!! Click the button to restart.");
                        $("#restart").show();
                    };
                }
            }
        }

    });

    $("#restart").click(function() {
        $("#restart").hide();
        $("#damage-stats").empty();
        enemyIsDead = true;
        currentPlayer = "";
        currentDefender = "";
        displayChoices();
        $(".avatar").css({backgroundColor: "white", color: "black"});
    });



});
