(function($) {

    "use strict";

    $(window).on('load', function() {

        /*Page Loader active
        ========================================================*/
        $('#preloader').fadeOut();

        // Sticky Nav
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 200) {
                $('.scrolling-navbar').addClass('top-nav-collapse');
            } else {
                $('.scrolling-navbar').removeClass('top-nav-collapse');
            }
        });

        /* ==========================================================================
           countdown timer
           ========================================================================== */
        jQuery('#clock').countdown('2018/06/21',function(event){
            var $this=jQuery(this).html(event.strftime(''
            +'<div class="time-entry days"><span>%-D</span> Days</div> '
            +'<div class="time-entry hours"><span>%H</span> Hours</div> '
            +'<div class="time-entry minutes"><span>%M</span> Minutes</div> '
            +'<div class="time-entry seconds"><span>%S</span> Seconds</div> '));
        });

        /* slicknav mobile menu active  */
        $('.mobile-menu').slicknav({
            prependTo: '.navbar-header',
            parentTag: 'liner',
            allowParentLinks: true,
            duplicate: true,
            label: '',
        });

          /* WOW Scroll Spy
        ========================================================*/
        var wow = new WOW({
            //disabled for mobile
            mobile: false
        });
        wow.init();

        /* Nivo Lightbox
        ========================================================*/
        $('.lightbox').nivoLightbox({
            effect: 'fadeScale',
            keyboardNav: true,
          });

        // one page navigation
        $('.navbar-nav').onePageNav({
            currentClass: 'active'
        });

        /* Back Top Link active
        ========================================================*/
        var offset = 200;
        var duration = 500;
        $(window).scroll(function() {
            if ($(this).scrollTop() > offset) {
                $('.back-to-top').fadeIn(400);
            } else {
                $('.back-to-top').fadeOut(400);
            }
        });

        $('.back-to-top').on('click',function(event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 600);
            return false;
        });



        // Registro de paciente y medico


        var modal = document.getElementById('modalpaciente');
        var modalok = document.getElementById('modalok');
        var modalokm = document.getElementById('modalokm');
        var modalmedico = document.getElementById('modalmedico');

// Get the button that opens the modal
        var btn = document.getElementById("btnpaciente");
        var btnmedico = document.getElementById("btnmedico");

// Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        var spanok = document.getElementsByClassName("closeok")[0];
        var spanmedico = document.getElementsByClassName("closemedico")[0];
         var spanokm = document.getElementsByClassName("closeokm")[0];

        

// When the user clicks on the button, open the modal
      btn.onclick = function() 
      {
        modal.style.display = "block";
        $("#nombres").focus();
        buscar_estados();
      }

      btnmedico.onclick = function() 
      {
        modalmedico.style.display = "block";
        //modalmedico.style.display = "block";
        $("#nombresm").focus();
        cargar_info_medicos();
      }

      span.onclick = function() 
      {
          modal.style.display = "none";
      }
      spanok.onclick = function() 
      {
        modalok.style.display = "none";
        modal.style.display = "none";
        location.reload();
      }

      spanokm.onclick = function() 
      {
        modalokm.style.display = "none";
        modalmedico.style.display = "none";
        location.reload();
      }

      spanmedico.onclick = function() 
      {
          modalmedico.style.display = "none";
      }

// When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) 
      {
        if (event.target == modal) 
        {
          modal.style.display = "none";
        }
        else if (event.target == modalok) 
        {
          modalok.style.display = "none";
        }
        else if (event.target == modalmedico) 
        {
          //modalmedico.style.display = "none";
        }
      }

      function validarcampo(input,tipo)
      {
        if(tipo=="I")
        {
            if(input.value=="")
            {
              input.style="border-color:red;";
            }
            else
            {
              input.style="border-color:green;";
            }
        }
        else
        {
          if(input.value==0)
          {
            input.style="border-color:red";
          }
          else
          {
            input.style="border-color:green;";
          }
        }
      }

function buscar_ciudades(tipo)
{


     
    var urlraiz="https://firstsoft.com.mx/apimeditech/api/auth";
    var miurl=urlraiz+"/buscar_ciudades"; 
    if(tipo=="P")
    {
        var estado= document.getElementById('estado').value;
    }
    else if(tipo=="C")
    {
        var estado= document.getElementById('estadoc').value;
    }
    else
    {
        var estado= document.getElementById('estadom').value;
    }
   
   //alert(estado);
   var parametros = {"estado" : estado,'tipo':tipo};
        $.ajaxSetup({ headers: {'X-CSRF-TOKEN': $('[name="_token"]').val()}});

        $.ajax(
        {     
                          
           type: 'post',
           url: miurl,
           dataType:'json',                   
           data: parametros, 
           success: function(data)             
           {
             var etiquetas="";
             var tabla="";
             var estadosc="";
             $.each(data,function(index, value) 
             {
                if(index=="tabla")
                {
                  tabla+= value;
                }


                

              
            })
             //alert('llego');
             
             if(tipo=="P")
             {
                $('#divciudad').html(tabla); 
             }
             else if (tipo=="C") 
             {
                $('#divciudadc').html(tabla);
             }
             else
             {
                $('#divciudadm').html(tabla);
             }

             
             //alert('Detalle agregado correctamente');
   


           },
            error: function(XMLHttpRequest, textStatus, errorThrown) 
            { 
              

                alert("Status: " + textStatus); 
                alert("Error: " + errorThrown ); 
            } 
        }
        );
   


}

function buscar_estados(tipo)
{   
    var urlraiz="https://firstsoft.com.mx/apimeditech/api/auth";
    var miurl=urlraiz+"/buscar_estados"; 
    $.ajaxSetup({headers: {'X-CSRF-TOKEN': $('[name="_token"]').val()}});
    $.ajax(
        {
          type: 'post',
           url: miurl,
           dataType:'json',                   
           success: function(data)             
           {

             var etiquetas="";
             var tabla="";
             var tallas="";

             $.each(data,function(index, value) 
             {
                if(index=="tabla")
                {
                  tabla+= value;
                }
                if(index=="tallas")
                {
                  tallas+= value;
                }   
                       

              
            })
             
             $('#divestado').html(tabla); 
             $('#divtalla').html(tallas);
           
             
          },
            error: function(XMLHttpRequest, textStatus, errorThrown) 
            { 
              

                alert("Status: " + textStatus); 
                alert("Error: " + errorThrown ); 
            } 
        }
        );


}


function cargar_info_medicos()
{   
    var urlraiz="https://firstsoft.com.mx/apimeditech/api/auth";
    var miurl=urlraiz+"/cargar_info_medicos"; 
    $.ajaxSetup({headers: {'X-CSRF-TOKEN': $('[name="_token"]').val()}});
    $.ajax(
        {
          type: 'post',
           url: miurl,
           dataType:'json',                   
           success: function(data)             
           {

             var areas="";
             var tabla="";
             var especialidades="";
             var profesiones="";
             var estadosc="";
             $.each(data,function(index, value) 
             {
                if(index=="tabla")
                {
                  tabla+= value;
                }
                if(index=="especialidades")
                {
                  especialidades+= value;
                } 
                if(index=="areas")
                {
                  areas+= value;
                }   
                if(index=="prefijos")
                {
                  profesiones+=value;
                }      
                if(index=="estadosc")
                {
                  estadosc+= value;
                }           

              
            })
             
             $('#divestadom').html(tabla); 
             $('#divespecialidades').html(especialidades);
             $('#divareas').html(areas);
             $('#divprefijos').html(profesiones);
               $('#divestadoc').html(estadosc);
             
          },
            error: function(XMLHttpRequest, textStatus, errorThrown) 
            { 
              

                alert("Status: " + textStatus); 
                alert("Error: " + errorThrown ); 
            } 
        }
        );


}

function registrar_pacientes()
{   
    var urlraiz="https://firstsoft.com.mx/apimeditech/api/auth";
    var miurl=urlraiz+"/registrar_pacientes"; 
    var estado= document.getElementById('estado').value;
    var ciudad= document.getElementById('ciudad').value;
    var nombres= document.getElementById('nombres').value;
    var apellidos= document.getElementById('apellidos').value;
    var email= document.getElementById('emailp').value;
    var telefono= document.getElementById('telefono').value;
    var calle= document.getElementById('calle').value;
    var colonia= document.getElementById('colonia').value;
    var codigo= document.getElementById('codigo').value;
    var usuario= document.getElementById('usuario').value;
    var foto= document.getElementById('foto');
    var fecha_nacimiento= document.getElementById('fecha_nacimiento').value;
    var sexo= document.getElementById('sexo').value;
    var peso= document.getElementById('peso').value;
    var talla= document.getElementById('talla').value;
    var alergias= document.getElementById('alergias').value;
    var vacunas= document.getElementById('vacunas').value;
    var tratamiento= document.getElementById('tratamiento').value;
    var cronicas= document.getElementById('cronicas').value;
    var cirugia= document.getElementById('cirugia').value;
    var otras= document.getElementById('otras').value;
    var tabaquismo="N";
    if( document.getElementById('tabaquismo').checked)
    {
      tabaquismo="S";
    }
    var alcoholismo="N";
    if( document.getElementById('alcoholismo').checked)
    {
      alcoholismo="S";
    }

    var hipertension="N";
    if( document.getElementById('hipertension').checked)
    {
      hipertension="S";
    }
    var diabetes="N";
    if( document.getElementById('diabetes').checked)
    {
      diabetes="S";
    }



    /*if($('#foto')[0].files[0]==null)
    {
      $('#error').css('display','inline');
      $('#lblerror').html('La foto es obligatoria, por favor revise su Información'); 
      return;
    }*/
    if(estado==null || estado==0 || estado=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('El estado es obligatorio, por favor revise su Información'); 
      return;
    }
    if(ciudad==null || ciudad==0 || ciudad=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('La ciudad es obligatoria, por favor revise su Información'); 
      return;
    }
    if(nombres==null || nombres==0 || nombres=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('El nombre es obligatorio, por favor revise su Información'); 
      return;
    }
    if(apellidos==null || apellidos==0 || apellidos=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('El apellido es obligatorio, por favor revise su Información'); 
      return;
    }
    if(email==null || email==0 || email=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('El E-Mail es obligatorio, por favor revise su Información'); 
      return;
    }
    if(telefono==null || telefono==0 || telefono=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('El teléfono es obligatorio, por favor revise su Información'); 
      return;
    }
    if(calle==null || calle==0 || calle=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('La calle es obligatoria, por favor revise su Información'); 
      return;
    }
    if(colonia==null || colonia==0 || colonia=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('La colonia es obligatoria, por favor revise su Información'); 
      return;
    }
    if(codigo==null || codigo==0 || codigo=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('El código postal es obligatorio, por favor revise su Información'); 
      return;
    }
    if(usuario==null || usuario==0 || usuario=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('El usuario es obligatorio, por favor revise su Información'); 
      return;
    }
    if(fecha_nacimiento==null || fecha_nacimiento==0 || fecha_nacimiento=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('La fecha de nacimiento es obligatoria, por favor revise su Información'); 
      return;
    }
    if(sexo==null || sexo==0 || sexo=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('El sexo es obligatorio, por favor revise su Información'); 
      return;
    }
    if(peso==null || peso==0 || peso=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('El peso es obligatorio, por favor revise su Información'); 
      return;
    }
    if(talla==null || talla==0 || talla=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('La talla es obligatoria, por favor revise su Información'); 
      return;
    }
    /*if(vacunas==null || vacunas==0 || vacunas=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('Las vacunas son obligatorias, por favor revise su Información'); 
      return;
    }*/
    var parametros = new FormData();
    parametros.append('foto',$('#foto')[0].files[0]);
    parametros.append('estado',estado);
    parametros.append('ciudad',ciudad);
    parametros.append('nombres',nombres);
    parametros.append('apellidos',apellidos);
    parametros.append('email',email);
    parametros.append('telefono',telefono);
    parametros.append('calle',calle);
    parametros.append('colonia',colonia);
    parametros.append('codigo',codigo);
    parametros.append('usuario',usuario);
    parametros.append('fecha_nacimiento',fecha_nacimiento);
    parametros.append('sexo',sexo);
    parametros.append('peso',peso);
    parametros.append('talla',talla);
    parametros.append('alergias',alergias);
    parametros.append('vacunas',vacunas);
    parametros.append('tratamiento',tratamiento);
    parametros.append('cronicas',cronicas);
    parametros.append('cirugia',cirugia);
    parametros.append('otras',otras);
    parametros.append('tabaquismo',tabaquismo);
    parametros.append('alcoholismo',alcoholismo);
    parametros.append('hipertension',hipertension);
    parametros.append('diabetes',diabetes);
    parametros.append('tipo_funcionalidad','W');
    $.ajaxSetup({ headers: {'X-CSRF-TOKEN': $('[name="_token"]').val()}});
    $.ajax(
        {
          type: 'post',
           url: miurl,
           dataType:'json',                   
           data: parametros,
           contentType: false, 
           processData:false,
           success: function(data)             
           {
             var etiquetas="";
             var estatus="";
             var mensaje="";
             $.each(data,function(index, value) 
             {
                if(index=="estatus")
                {
                  estatus=value;
                }
                if(index=="mensaje")
                {
                  mensaje= value;
                }
              })
             
             //$('#error').css('display','inline');
             //$('#lblerror').html(mensaje); 
             modalok.style.display = "block";
           },           
           complete:function(data)
           { 

              if(data.status==300)
               {                  
                  var estatus="";
                  var mensaje="";
                  $.each(data.responseJSON,function(index, value) 
                  {                    
                    if(index=="estatus")
                    {
                        estatus= value;
                    }
                    if(index=="mensaje")
                    {
                        mensaje= value;
                    }                    
                  });
                  if(estatus=="fail")
                  {
                      $('#error').css('display','inline');
                      $('#lblerror').html(mensaje); 
                  }
               }  
               else if(data.status==200)
               {                  
                  var estatus="";
                  var mensaje="";
                  $.each(data.responseJSON,function(index, value) 
                  {                    
                    if(index=="estatus")
                    {
                        estatus= value;
                    }
                    if(index=="mensaje")
                    {
                        mensaje= value;
                    }                    
                  });
                  if(estatus=="ok")
                  {   
                    modalok.style.display = "block";
                    //$('#error').css('display','inline');
                    //  $('#lblerror').html(mensaje); 
                  }
               }            
               else
               {
                  mensaje="Ha ocurrido un error en el servidor, por favor intentelo mas tarde."+data.status;
                  $('#error').css('display','inline');
                  $('#lblerror').html(mensaje); 
               }
            }
        }
        ); 


}


function registrar_medicos()
{   
    var urlraiz="https://firstsoft.com.mx/apimeditech/api/auth";
    var miurl=urlraiz+"/registrar_medicos"; 
    var estado= document.getElementById('estadom').value;
    var ciudad= document.getElementById('ciudadm').value;
    var nombres= document.getElementById('nombresm').value;
    var apellidos= document.getElementById('apellidosm').value;
    var email= document.getElementById('emailm').value;
    var telefono= document.getElementById('telefonom').value;
    var calle= document.getElementById('callem').value;
    var colonia= document.getElementById('coloniam').value;
    var codigo= document.getElementById('codigom').value;
    var usuario= document.getElementById('usuariom').value;
    var foto= document.getElementById('fotom');
    var celular= document.getElementById('celularm').value;
    var prefijo= document.getElementById('prefijom').value;
    var cedula= document.getElementById('cedulam').value;
    var costo_videollamada= document.getElementById('costo_videollamadam').value;
    var costo_consulta= document.getElementById('costo_consultam').value;
    var universidad= document.getElementById('universidadm').value;
    var reconocimientos= document.getElementById('reconocimientosm').value;
    var especialidad= document.getElementById('especialidadm').value;
    var cedula_especialidad= document.getElementById('cedula_especialidadm').value;
    var subespecialidad= document.getElementById('subespecialidadm').value;    
    var cedula_subespecialidad= document.getElementById('cedula_subespecialidadm').value;
    var area= document.getElementById('aream').value;
    var presentacion= document.getElementById('presentacionm').value;
    var idiomas= document.getElementById('idiomasm').value;
    var curp= document.getElementById('curpm').value;
    var rfc= document.getElementById('rfc').value;
    var nombre_consultorio= document.getElementById('nombre_consultorio').value;
    var telefonoc= document.getElementById('telefonoc').value;
    var callec= document.getElementById('callec').value;
    var coloniac= document.getElementById('coloniac').value;
    var codigoc= document.getElementById('codigoc').value;
     var estadoc= document.getElementById('estadoc').value;
    var ciudadc= document.getElementById('ciudadc').value;
    
    if($('#fotom')[0].files[0]==null)
    {
      $('#errorm').css('display','inline');
      $('#lblerrorm').html('La foto es obligatoria, por favor revise su Información'); 
      return;
    }
    if(estado==null || estado==0 || estado=="")
    {
       $('#errorm').css('display','inline');
      $('#lblerrorm').html('El estado es obligatorio, por favor revise su Información'); 
      return;
    }
    if(ciudad==null || ciudad==0 || ciudad=="")
    {
       $('#errorm').css('display','inline');
      $('#lblerrorm').html('La ciudad es obligatoria, por favor revise su Información'); 
      return;
    }
    if(nombres==null || nombres==0 || nombres=="")
    {
       $('#errorm').css('display','inline');
      $('#lblerrorm').html('El nombre es obligatorio, por favor revise su Información'); 
      return;
    }
    if(apellidos==null || apellidos==0 || apellidos=="")
    {
       $('#errorm').css('display','inline');
      $('#lblerrorm').html('El apellido es obligatorio, por favor revise su Información'); 
      return;
    }
    if(email==null || email==0 || email=="")
    {
       $('#errorm').css('display','inline');
      $('#lblerrorm').html('El E-Mail es obligatorio, por favor revise su Información'); 
      return;
    }
    if(telefono==null || telefono==0 || telefono=="")
    {
       $('#errorm').css('display','inline');
      $('#lblerrorm').html('El teléfono es obligatorio, por favor revise su Información'); 
      return;
    }
    if(calle==null || calle==0 || calle=="")
    {
       $('#errorm').css('display','inline');
      $('#lblerrorm').html('La calle es obligatoria, por favor revise su Información'); 
      return;
    }
    if(colonia==null || colonia==0 || colonia=="")
    {
       $('#errorm').css('display','inline');
      $('#lblerrorm').html('La colonia es obligatoria, por favor revise su Información'); 
      return;
    }
    if(codigo==null || codigo==0 || codigo=="")
    {
       $('#errorm').css('display','inline');
      $('#lblerrorm').html('El código postal es obligatorio, por favor revise su Información'); 
      return;
    }
    if(usuario==null || usuario==0 || usuario=="")
    {
       $('#errorm').css('display','inline');
      $('#lblerrorm').html('El usuario es obligatorio, por favor revise su Información'); 
      return;
    }


    if(prefijo==null || prefijo==0 || prefijo=="")
    {
       $('#errorm').css('display','inline');
      $('#lblerrorm').html('El prefijo de su profesión es obligatorio, por favor revise su Información'); 
      return;
    }
    if(cedula==null || cedula==0 || cedula=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('La cédula profesional es obligatoria, por favor revise su Información'); 
      return;
    }
    if(costo_videollamada==null || costo_videollamada==0 || costo_videollamada=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('El costo d ela Videollamada es obligatorio, por favor revise su Información'); 
      return;
    }
    if(costo_consulta==null || costo_consulta==0 || costo_consulta=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('El costo de la consulta es obligatorio, por favor revise su Información'); 
      return;
    }
    if(universidad==null || universidad==0 || universidad=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('La universidad es obligatoria, por favor revise su Información'); 
      return;
    }

    if(reconocimientos==null || reconocimientos==0 || reconocimientos=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('Los reconocimientos son obligatorios, por favor revise su Información'); 
      return;
    }

    if(presentacion==null || presentacion==0 || presentacion=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('La presentación es obligatoria, por favor revise su Información'); 
      return;
    }

    if(curp==null || curp==0 || curp=="")
    {
       $('#error').css('display','inline');
      $('#lblerror').html('La CURP es obligatoria, por favor revise su Información'); 
      return;
    }
    var misma="N";
    if( document.getElementById('misma').checked)
    {
       misma="S";
    }

    if(misma=="N")
    {
        if(callec==null || callec==0 || callec=="")
        {
          $('#errorm').css('display','inline');
          $('#lblerrorm').html('La calle del consultorio es obligatoria, por favor revise su Información'); 
          return;
        }
        if(coloniac==null || coloniac==0 || coloniac=="")
        {
          $('#errorm').css('display','inline');
          $('#lblerrorm').html('La colonia del consultorio es obligatoria, por favor revise su Información'); 
          return;
        }
        if(codigoc==null || codigoc==0 || codigoc=="")
        {
            $('#errorm').css('display','inline');
            $('#lblerrorm').html('El código postal del consultorio es obligatorio, por favor revise su Información'); 
            return;
        }
        if(estadoc==null || estadoc==0 || estadoc=="")
        {
            $('#errorm').css('display','inline');
            $('#lblerrorm').html('El estado del consultorio es obligatorio, por favor revise su Información'); 
            return;
        }
        if(ciudadc==null || ciudadc==0 || ciudadc=="")
        {
            $('#errorm').css('display','inline');
            $('#lblerrorm').html('La ciudad del consultorio es obligatoria, por favor revise su Información'); 
            return;
        }
    }


    var parametros = new FormData();
    parametros.append('foto',$('#fotom')[0].files[0]);
    parametros.append('estado',estado);
    parametros.append('ciudad',ciudad);
    parametros.append('nombres',nombres);
    parametros.append('apellidos',apellidos);
    parametros.append('email',email);
    parametros.append('telefono',telefono);
    parametros.append('calle',calle);
    parametros.append('colonia',colonia);
    parametros.append('codigo',codigo);
    parametros.append('usuario',usuario);
    parametros.append('curp',curp);
    parametros.append('celular',celular);
    parametros.append('prefijo',prefijo);
    parametros.append('cedula',cedula);
    parametros.append('costo_videollamada',costo_videollamada);
    parametros.append('costo_consulta',costo_consulta);
    parametros.append('universidad',universidad);
    parametros.append('reconocimientos',reconocimientos);
    parametros.append('especialidad',especialidad);
    parametros.append('cedula_especialidad',cedula_especialidad);
    parametros.append('subespecialidad',subespecialidad);
    parametros.append('cedula_subespecialidad',cedula_subespecialidad);
    parametros.append('area',area);
    parametros.append('presentacion',presentacion);
    parametros.append('idiomas',idiomas);
    parametros.append('tipo_funcionalidad','W');
    parametros.append('utiliza_misma_direccion',misma);
    parametros.append('nombre_consultorio',misma);
    parametros.append('utiliza_misma_direccion',misma);
    parametros.append('callec',callec);
    parametros.append('coloniac',coloniac);
    parametros.append('codigoc',codigoc);
    parametros.append('estadoc',estadosc);
    parametros.append('ciudadc',ciudadc);

    

    $.ajaxSetup({ headers: {'X-CSRF-TOKEN': $('[name="_token"]').val()}});
    $.ajax(
        {
          type: 'post',
           url: miurl,
           dataType:'json',                   
           data: parametros,
           contentType: false, 
           processData:false,
           success: function(data)             
           {
             var etiquetas="";
             var estatus="";
             var mensaje="";
             $.each(data,function(index, value) 
             {
                if(index=="estatus")
                {
                  estatus=value;
                }
                if(index=="mensaje")
                {
                  mensaje= value;
                }
              })
             
             //$('#error').css('display','inline');
             //$('#lblerror').html(mensaje); 
             modalokm.style.display = "block";
             //modalokm.style.position="relative";
           },           
           complete:function(data)
           { 

              if(data.status==300)
               {                  
                  var estatus="";
                  var mensaje="";
                  $.each(data.responseJSON,function(index, value) 
                  {                    
                    if(index=="estatus")
                    {
                        estatus= value;
                    }
                    if(index=="mensaje")
                    {
                        mensaje= value;
                    }                    
                  });
                  if(estatus=="fail")
                  {
                      $('#errorm').css('display','inline');
                      $('#lblerrorm').html(mensaje); 
                  }
               }  
               else if(data.status==200)
               {                  
                  var estatus="";
                  var mensaje="";
                  $.each(data.responseJSON,function(index, value) 
                  {                    
                    if(index=="estatus")
                    {
                        estatus= value;
                    }
                    if(index=="mensaje")
                    {
                        mensaje= value;
                    }                    
                  });
                  if(estatus=="ok")
                  {   
                    modalokm.style.display = "block";
                    //modalokm.style.position="relative";
                    //$('#error').css('display','inline');
                    //  $('#lblerror').html(mensaje); 
                  }
               }            
               else
               {
                  mensaje="Ha ocurrido un error en el servidor, por favor intentelo mas tarde."+data.status;
                  $('#errorm').css('display','inline');
                  $('#lblerrorm').html(mensaje); 
               }
            }
        }
        ); 


}


function habilitadatoscon()
{   
    if( document.getElementById('misma').checked)
    {
      $('#direccion').css('display','none');

    }
    else
    {
      $('#direccion').css('display','inline');
    }
             
             
           
             



}


        //fin registro de paciente y medico

  });

}(jQuery));
