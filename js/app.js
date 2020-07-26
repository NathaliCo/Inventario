var selectedCard =$('#cards')
	$('#cards-autocomplete').keydown(function(event) {
	if (event.keyCode === 13) {
	event.preventDefault();
	save();
	}else{
		console.log("NOP");
	};
});

function save(){

		UIkit.modal('#next').show();
			$('#many').keypress(function(event) {
				if (event.keyCode === 13) {
					event.preventDefault();	document.getElementById("specifications").innerHTML='<b>¿Cuál es la condición de la carta? <br> Teclea: <br></b> n=NM<br> s=SP <br> p=PL <br> h=HP <br> d=DMG';
					$(document).keydown(function(event) {
						if (event.keyCode === 13 || event.keyCode === 78 || event.keyCode === 83  || event.keyCode === 80  || event.keyCode === 72  || event.keyCode === 68) {
							event.preventDefault();	
							document.getElementById("specifications").innerHTML='<b>¿Cuál es el costo de la carta? <br> <input id="cost" type="number" value="1" autofocus="autofocus">';
							$('#cost').focus();
							$('#cost').keydown(function(event) {
								if (event.keyCode === 13 && $("#cost").val()) {
									event.preventDefault();
									UIkit.modal('#next').hide();
									UIkit.notification({message: '<div class=""> Se ha agregado correctamente a tu inventario</div>',status:'success'});
									
									window.setTimeout(function(){
										location.reload();
									},1000);
								};
							});
						};
					});
				};
			});
}

$(function() {
	var expansions  =  [
		{
			value:"Todas",
			label: "Todas",
		},
		{
			value:"Commander 2018",
			label:"Commander 2018",
		},
		{
			value:"Commander 2019",
			label:"Commander 2019",
		},
		{
			value:"Commander 2020",
			label:"Commander 2020",
		},
		{
			value:"Kaladesh",
			label:"Kaladesh",
		},
	];
	var cards = [
		{
			value: "java Kaladesh",
			label: "Java ",
		desc: `<img class="" src="https://img.scryfall.com/sets/aer.svg?1595217600" /> <span class="iTEXT">Kaladesh</span>`,
		},
		{
			value: "jquery-ui",
			label: "jQuery UI",
		},
		{
			value: "Bootstrap",
			label: "Twitter Bootstrap",
			desc: "popular front end frameworks ",
		}
	];
	var format  =  [
		{
			value:"Estandar",
			label:"Estandar",
		},
		{
			value:"Commander",
			label:"Commander",
		},
		{
			value:"Pioneer",
			label:"Pioneer",
		},
	];
	$( "#expansions-automplete" ).autocomplete({
		source: expansions,
		focus: function( event, ui ) {
			$( "#expansions-automplete" ).val( ui.item.label );
			return false;
		},
		select: function( event, ui ) {
			$( "#expansions-automplete" ).val( ui.item.value );
			$( "#expansion-id" ).val( ui.item.value );
			return false;
		}
	});
	$( "#format-automplete" ).autocomplete({
		source: format,
		focus: function( event, ui ) {
			$( "#format-automplete" ).val( ui.item.label );
			return false;
		},
		select: function( event, ui ) {
			$( "#format-automplete" ).val( ui.item.value );
			$( "#format-id" ).val( ui.item.value );
			return false;
		}
	});
	$( "#cards-autocomplete" ).autocomplete({
		minLength: 0,
		source: cards,
		focus: function( event, ui ) {
			$( "#cards-autocomplete" ).val( ui.item.label );
				return false;
		},
		select: function( event, ui ) {
			$( "#cards-autocomplete" ).val( ui.item.value );
			$( "#card-id" ).val( ui.item.value );
			return false;
		}
	})
		
	.data( "ui-autocomplete" )._renderItem = function( ul, item ) {
		return $( "<li onclick='save();' onfocus='save();'>" )
		.append( `<a  id ='${item.value}'>" ${item.label} "<br>" ${item.desc} "</a>` )
		.appendTo( ul );
	};
});






//_----------------------------------------------
$('.btn-number').click(function(e){
    e.preventDefault();
    
    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {
            
            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            } 
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {
    
    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());
    
    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('No puedes guardar menos de una carta');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    
    
});
$(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
