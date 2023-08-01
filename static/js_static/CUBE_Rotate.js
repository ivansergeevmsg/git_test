//"use strict";

// Fog.js (c) 2012 matsuda and ohnishi
// Vertex shader program
var Fog_01 =this;

var m_ang_v=0;
var m_ang_h=0;
var m_ang_v2=0;
var m_ang_h2=0;
var m_ang_v2_=0;
var m_ang_h2_=0;

var CANVAS;
var canv2D;
var hud;
var gl;
var IS_ACTIVE = true;
var INTENSITY = 1;

var gl_N=0;

var timeStamp_old=0;
var mm_old_curr_Date=Date.now();
    mm_old_curr_Date *= 0.05;
var mm_step=0;
var mm_step_=0;
var mm_step2=-1;

var m_iter=0;
var mm_currentAngle  = [0.0, 0.0]; //[20.0, -20.0]; // Current rotation angle ([x-axis, y-axis] degrees)
var mm_currentAngle_ = [0.0, 0.0]; //[20.0, -20.0]; // Current rotation angle ([x-axis, y-axis] degrees)

var mm_scale =1;
var mm_scale_=1;

var u_FogColor =0;
var u_MvpMatrix =0;
var fogColor = new Float32Array([0.95, 0.95, 0.95]);
var fogDist = new Float32Array([52, 200]); //([68, 120]);
var d_fogDist=0;
var f_fogDist=52;
var r_fogDist=200;

var mm_passive=0;
var last_date=Date.now();

var mm_qe = 20; //20;
var FL=mm_qe*mm_qe*mm_qe;
var FL_cur=FL;

var xrnd_c=0;
var xrnd_k=0;

var yrnd_c=0;
var yrnd_k=0;

var mm_mode1=0;

var g_objs = [];

var mm_step_F=0;
var but_mode=[1,2,3,4,5, 1000];
var mm_mode_F=1;
var mm_mode_F_=1;
var mm_mode_F_old=1;
var mm_mode_but_coords=[];

var mm_login_mode=0;
var mm_str_lgn ="";
var mm_str_pwd ="";
var mm_dlg_str ="";
var iter_login=0;
var iter_login_s=0.1;

var show_3d=1;
var show_2d=1;
var mm_mode_F_3D=0;
var mm_mode_F_2D=0;
var redraw2D=1;

var n_main_DGRM  =-1;
var n_main_DGRM_ =-1;
var n_main_DGRM_sh=0;
var DGRM_param0={dA:0.0, dB:0.0, Z:0.5};
var DGRM_param1={dA:0.1, dB:0.1, Z:0.7};
var temp_2D_img={data: -1};
var DGRM_params_nA =0;
var DGRM_params_nB =0;
var DGRM_params_nA_=0;
var DGRM_params_nB_=0;

var DGRM_mouse_act=-1;

var sp_mouse_x =-1;
var sp_mouse_y =-1;
var sp_mouse_x_=-1;
var sp_mouse_y_=-1;
var dragging  = false;
var dragging_ = false;

var sp_old_img={data: -1};
var sp_mouse_x_img =-1;
var sp_mouse_y_img =-1;



var curr_mouse_x=0;
var curr_mouse_y=0;
var m_pixels = new Uint8Array(4);
var m_data=0;


var WND_height=1;
var WND_width =1;

var sp_mouse_x_old=0;
var sp_mouse_y_old=0;


var g_Matrix1  = new Matrix4(); // Model matrix
var g_Matrix1a = new Matrix4(); // Model matrix
var g_Matrix1b = new Matrix4(); // Model matrix
var g_Matrix1c = new Matrix4(); // Model matrix
var g_Matrix2  = new Matrix4(); // Model view projection matrix
var g_Matrix3  = new Matrix4(); // Normals matrix

var eye = new Float32Array([0, 0, 70/*70*/, 1.0]); //= new Float32Array([5, 20, 80, 1.0]);
var mvpMatrix  = new Matrix4();
var mvpMatrix0 = new Matrix4();
var Pos_type = new Float32Array([0, 0, 0]);

var glob_click=0;

var glob_min_Z = -1000000;
var glob_P =-1;
var glob_Pv = [-1,-1,-1,-1,-1,-1,-1];
var glob_Pv_x = [-1,-1,-1,-1,-1,-1,-1];
var glob_Pv_y = [-1,-1,-1,-1,-1,-1,-1];
var glob_Pv_z = [-1,-1,-1,-1,-1,-1,-1];
var glob_P_id =-1;

var glob__P =-1;
var glob__P_id =-1;
var glob__P_ =-1;
var glob__P_id_ =-1;
var glob__P_old =-1;
var glob__P_id_old =-1;

var glob_sel_0a=-1;

var glob_sel_1a=-1;
var glob_sel_2a=-1;
var glob_sel_3a=-1;
var glob_sel_4a=-1;
var glob_sel_5a=-1;
var glob_sel_6a=-1;

var glob_sh_x0=0;
var glob_sh_x1=mm_qe;
var glob_sh_y0=0;
var glob_sh_y1=mm_qe;
var glob_sh_z0=0;
var glob_sh_z1=mm_qe;

var glob_6_x=-1;
var glob_6_y=-1;
var glob_6_z=-1;

var glob__PP =-1;
var glob__PP_id=-1;

var mm_sender=0;

var glob_sel_Z = [-1000000,-1000000,-1000000,-1000000,-1000000,-1000000,-1000000];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function rand_10() {
  var x=Math.random()*3.0;
  var y=Math.ceil(x);
  return y;
}

function rand_N(n) {
  var x=Math.random()*n;
  var y=Math.ceil(x);
  return y;
}

function main() {
  //
  var currentAngle = [0.0, 0.0]; // Current rotation angle ([x-axis, y-axis] degrees)

  var modelMatrix = new Matrix4();
  //var mvpMatrix = new Matrix4();
  var g_normalMatrix = new Matrix4(); // Coordinate transformation matrix for normals
  

  // Retrieve <canvas> element
  CANVAS = document.getElementById('webgl');
  canv2D = document.getElementById('canvas2D');
  hud    = document.getElementById('hud');  

  // Get the rendering context for 2DCG
  var ctx = hud.getContext('2d');


  // Get the rendering context for WebGL
  gl = CANVAS.getContext("webgl");
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  var VSHADER_SOURCE=document.getElementById('VSHADER_SOURCE').textContent;
  var FSHADER_SOURCE=document.getElementById('FSHADER_SOURCE').textContent;
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }


  
  // 
  var n = initVertexBuffers(gl);
  initVertexBuffers_Color(gl,0); 
  gl_N=n;

  if (n < 1) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Color of Fog
  //var fogColor = new Float32Array([0.95, 0.95, 0.95]); // new Float32Array([0.137, 0.210, 0.320]); // new Float32Array([0.137, 0.231, 0.423]);
  // Distance of fog [where fog starts, where fog completely covers object]
  
  // Position of eye point (world coordinates)
  //*/var eye = new Float32Array([25, 65, 35, 1.0]);
  //var eye = new Float32Array([0, 20, 80, 1.0]);

  // Get the storage locations of uniform variables
      u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  var u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
  var u_Eye = gl.getUniformLocation(gl.program, 'u_Eye');
      u_FogColor = gl.getUniformLocation(gl.program, 'u_FogColor');
  var u_FogDist = gl.getUniformLocation(gl.program, 'u_FogDist');
  /// var u_Cust_color  = gl.getUniformLocation(gl.program, 'u_Color2');
  var u_Cust_colorm = gl.getUniformLocation(gl.program, 'u_Color2m');
  var u_Block_dark = gl.getUniformLocation(gl.program, 'u_Block_dark');
  var u_Pos_type = gl.getUniformLocation(gl.program, 'u_Pos_type');
  var u_Mark = gl.getUniformLocation(gl.program, 'u_Mark');

  if (!u_MvpMatrix || !u_ModelMatrix || !u_NormalMatrix || !u_Eye || !u_FogColor || !u_FogDist) {
    console.log('Failed to get the storage location');
    return;
  }
	
  // Set clear color and enable hidden surface removal
  

  // Pass fog color, distances, and eye point to uniform variable
  gl.uniform3fv(u_FogColor, fogColor); // Colors
  gl.uniform2fv(u_FogDist, fogDist);   // Starting point and end point
  gl.uniform4fv(u_Eye, eye);           // Eye point

  gl.uniform1f(u_Block_dark,1.0);   // Darkness of Block
  gl.uniform3fv(u_Pos_type, Pos_type);
  gl.uniform1f(u_Mark,0.0);   // выделенный блок

  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
  //gl.uniformMatrix4fv(u_MvpMatrix, false, g_Matrix2.elements);

  // Set clear color and enable hidden surface removal


  ini_model();

  updateCanvasSize(CANVAS, gl, hud, ctx);

  gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

  gl.clearColor(fogColor[0], fogColor[1], fogColor[2], 1.0); // Color of Fog

  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);

  change_mode_F();

  document.onkeydown = function(ev){ keydown(ev/*, gl, n, u_FogDist, fogDist, mvpMatrix*/ /*vpMatrix*//*, u_ModelMatrix, u_MvpMatrix, u_NormalMatrix, currentAngle*/); };


  initEventListeners(CANVAS, gl, hud, ctx, mm_currentAngle, mm_scale);
  

  //mm_currentAngle[0]=currentAngle[0];
  //mm_currentAngle[1]=currentAngle[1];

  view_panel(hud,ctx);

  //mm_mode_F_old=mm_mode_F;
  //mm_mode_F=new_js.mm_mode_F;
  change_mode_F();
  m_iter=0;

  var tick = function(timeStamp) {   // Start drawing

    var date0=Date.now();
    
    draw_M(timeStamp,date0,gl_N, u_FogDist,/* modelMatrix,*/ u_ModelMatrix, /* mvpMatrix, /*vpMatrix,*/ u_MvpMatrix, /*m_normalMatrix,*/ u_NormalMatrix, mm_currentAngle, mm_scale);
    if(mm_sender==1)
    {
      if(mm_passive==0)
      {
        var date_=Date.now();
        if(date_-last_date>0.01)
        {
          //draw_M(timeStamp,gl_N, u_FogDist, modelMatrix, u_ModelMatrix/*,  mvpMatrix /*vpMatrix*/, u_MvpMatrix, /*m_normalMatrix,*/ u_NormalMatrix, mm_currentAngle);
          last_date=date_;
          if(mm_mode_F!=5)
          {
            if(glob__P_!=glob__P)
            {
              glob__P=glob__P;
            }
            if(mm_currentAngle[0]!=mm_currentAngle_[0] || mm_currentAngle[1]!=mm_currentAngle_[1] /*|| mm_step_!=mm_step*/ || mm_scale_!=mm_scale || mm_mode_F_!=mm_mode_F || sp_mouse_x_!=sp_mouse_x || sp_mouse_y_!=sp_mouse_y || dragging_!=dragging || DGRM_params_nA_!=DGRM_params_nA || DGRM_params_nB_!=DGRM_params_nB || glob__P_!=glob__P || glob__P_id_!=glob__P_id || glob_P_!=glob_P || glob_P_id_!=glob_P_id)
            {
              mm_currentAngle_[0]=mm_currentAngle[0];
              mm_currentAngle_[1]=mm_currentAngle[1];
              mm_step_=mm_step;
              mm_scale_=mm_scale;

              mm_mode_F_=mm_mode_F;

              n_main_DGRM_=n_main_DGRM;
              sp_mouse_x_=sp_mouse_x;
              sp_mouse_y_=sp_mouse_y;
              dragging_=dragging;
              DGRM_params_nA_=DGRM_params_nA;
              DGRM_params_nB_=DGRM_params_nB;

              glob_P_    =glob_P;
              glob_P_id_ =glob_P_id;
              glob__P_   =glob__P;
              glob__P_id_=glob__P_id;

              var msg = {
                type: "gl_data_raw",
                back_id: "gl_01",
                currentAngle_0: mm_currentAngle_[0],
                currentAngle_1: mm_currentAngle_[1],
                test_data: mm_currentAngle_,
                mm_step: mm_step,
                mm_scale: mm_scale,
                mm_mode1: mm_mode1,
                mm_mode_F:mm_mode_F,
                mm_n_main_DGRM: n_main_DGRM,
                mm_sp_mouse_x: sp_mouse_x,
                mm_sp_mouse_y: sp_mouse_y,
                mm_dragging: dragging,
                mm_DGRM_params_nA: DGRM_params_nA,
                mm_DGRM_params_nB: DGRM_params_nB,
                mm_glob_P:     glob_P,
                mm_glob_P_id:  glob_P_id,
                mm_glob__P:    glob__P,
                mm_glob__P_id: glob__P_id
              };
              get_ws_data(msg);
            }
          }
          else
          {
            if(n_main_DGRM_!=n_main_DGRM || mm_mode_F_!=mm_mode_F || sp_mouse_x_!=sp_mouse_x || sp_mouse_y_!=sp_mouse_y || dragging_!=dragging || DGRM_params_nA_!=DGRM_params_nA || DGRM_params_nB_!=DGRM_params_nB)
            {
              mm_currentAngle_[0]=mm_currentAngle[0];
              mm_currentAngle_[1]=mm_currentAngle[1];
              mm_step_=mm_step;
              mm_scale_=mm_scale;
              
              mm_mode_F_=mm_mode_F;

              n_main_DGRM_=n_main_DGRM;
              sp_mouse_x_=sp_mouse_x;
              sp_mouse_y_=sp_mouse_y;
              dragging_=dragging;
              DGRM_params_nA_=DGRM_params_nA;
              DGRM_params_nB_=DGRM_params_nB;

              var msg = {
                type: "gl_data_raw",
                back_id: "gl_01",
                currentAngle_0: mm_currentAngle_[0],
                currentAngle_1: mm_currentAngle_[1],
                test_data: mm_currentAngle_,
                mm_step: mm_step,
                mm_scale: mm_scale,
                mm_mode1: mm_mode1,
                mm_mode_F:mm_mode_F,
                mm_n_main_DGRM: n_main_DGRM,
                mm_sp_mouse_x: sp_mouse_x,
                mm_sp_mouse_y: sp_mouse_y,
                mm_dragging: dragging,
                mm_DGRM_params_nA: DGRM_params_nA,
                mm_DGRM_params_nB: DGRM_params_nB
              };
              get_ws_data(msg);
            }
          }
          
        }
      }
      else
      {
        mm_currentAngle_[0]=mm_currentAngle[0];
        mm_currentAngle_[1]=mm_currentAngle[1];
        mm_step_=mm_step;
        mm_scale_=mm_scale;
        
        mm_mode_F_=mm_mode_F;

        n_main_DGRM_=n_main_DGRM;
        sp_mouse_x_=sp_mouse_x;
        sp_mouse_y_=sp_mouse_y;
      }
    }
    //mm_passive=0;
    requestAnimationFrame(tick, CANVAS);
  };
  tick(0);


  function draw_M(timeStamp,curr_Date,n, u_FogDist,/* mm_Matrix,*/ u_Matrix,/* vpMatrix,*/ u_MvpMatrix, /*mm_normalMatrix,*/ uu_NormalMatrix, currentAngle, scale) {
    draw_MM(timeStamp,curr_Date,n, u_FogDist, /* mm_Matrix,*/ u_Matrix,/* vpMatrix,*/ u_MvpMatrix, /*mm_normalMatrix,*/ uu_NormalMatrix, currentAngle, scale);
  }
  
  function draw_MM(timeStamp,curr_Date,n, u_FogDist, /*mm_Matrix,*/ u_Matrix,/* vpMatrix,*/ u_MvpMatrix, /*mm_normalMatrix,*/ uu_NormalMatrix, currentAngle, scale) {
    timeStamp *= 0.02;
    curr_Date *= 0.005;
    //mm_step=0;
    var lim=300000;
    if(mm_passive==0)
    {
      if(mm_step>-5 && mm_step<5)
      {
        rot_k=0.2;
        if(mm_step>-2 && mm_step<2)
        {
          rot_k=0.1;
        }
      }
      else
      {
        rot_k=1;
      }
      //mm_step=mm_step+stop_dir*10.0;//rot_k*0.5*(timeStamp-mm_old_timeStamp);
      mm_step=mm_step+/*Math.floor*/(2.0*(curr_Date-mm_old_curr_Date));

    }
    else
    {
      if(mm_step2==mm_step)
      {
        mm_step=mm_step+Math.floor(1.0*(curr_Date-mm_old_curr_Date));
      }
    }
    mm_step2=mm_step;

    rot_kk=1;
    /////////////////////////////////
    if(show_3d==1)
    {
      gl.enable(gl.CULL_FACE);
      gl.enable(gl.DEPTH_TEST);
    
      // Clear the canvas AND the depth buffer.
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);     // Clear buffers
      /// gl.uniform1f(gl.getUniformLocation(gl.program, 'u_time'), timeStamp / 1000.0);
    
      gl.uniform2fv(u_FogDist, fogDist);   // Pass the distance of fog
    
      // Caliculate The model view projection matrix and pass it to u_MvpMatrix
      //// g_Matrix1.set(mm_Matrix);
      g_Matrix1.setIdentity();

      //var sc=3;

      var qe=mm_qe;
      //var k_scale=0.2+mm_scale;
      var dd=0.2;
      //var sh=qe*(1+dd/qe)/(qe-1);

      var sc_new=1;
      var sc_old=1;

      var ang_new=[0,0];
      var ang_old=[0,0];

      var base_scale_K=9;

      if(mm_mode_F==1 || mm_mode_F==2)
      {
        sc_new=1 * base_scale_K/(qe*(1+dd));
        ang_new=[0,0];
      }
      else
      {
        sc_new=mm_scale * base_scale_K/(qe*(1+dd));
        ang_new[0]=currentAngle[0];
        ang_new[1]=currentAngle[1];
      }

      if(mm_mode_F_old==1 || mm_mode_F_old==2)
      {
        sc_old=1 * base_scale_K/(qe*(1+dd));
        ang_old=[0,0];
      }
      else
      {
        sc_old=mm_scale * base_scale_K/(qe*(1+dd));
        ang_old[0]=currentAngle[0];
        ang_old[1]=currentAngle[1];
      }

      g_Matrix1.scale(sc_new+(sc_new-sc_old)*m_iter,sc_new+(sc_new-sc_old)*m_iter,sc_new+(sc_new-sc_old)*m_iter);
      g_Matrix1.rotate(ang_new[0]+(ang_new[0]-ang_old[0])*m_iter /*+mm_step*0*/, 1.0, 0.0, 0.0); // Rotation around x-axis
      g_Matrix1.rotate(ang_new[1]+(ang_new[1]-ang_old[1])*m_iter /*+mm_step*0*/, 0.0, 1.0, 0.0); // Rotation around y-axis


      var NN=g_objs.length;
      
      var xrnd=0;
      var yrnd=0;
      xrnd_c=xrnd_c+xrnd_k/10;
      yrnd_c=yrnd_c+yrnd_k/10;
      
      if(timeStamp-timeStamp_old>10)
      {
        xrnd=rand(-1,1);
        xrnd_k=xrnd/2;
        yrnd=rand(-1,1);
        yrnd_k=yrnd/2;
        timeStamp_old=timeStamp;

      }
      if(xrnd_c>10 || xrnd_c<-0)
      {
        xrnd_k=-xrnd_k;
      }
      
      if(yrnd_c>10 || yrnd_c<-0)
      {
        yrnd_k=-yrnd_k;
      }
      //step_upd(i);
      if(d_fogDist<0)
      {
        if(fogDist[1] + d_fogDist > fogDist[0] && fogDist[1] + d_fogDist > f_fogDist) 
        {
          fogDist[1] += d_fogDist;
        }
        else
        {
          //fogDist[1] = 200;
          d_fogDist  = 0;
          f_fogDist=52;
          r_fogDist=200;
        }
      }
      else if(d_fogDist>0)
      {
        if(fogDist[1] + d_fogDist < 200 && fogDist[1] + d_fogDist < r_fogDist) 
        {
          fogDist[1] += d_fogDist;
        }
        else
        {
          fogDist[1] = 200;
          d_fogDist  = 0;
          f_fogDist=52;
          r_fogDist=200;
        }
      }
      ////////////////////////////////////
      
      let mn=0;
      let mn_arr=[];
      var pm=0;

      if(mm_passive == 0)
      {

        glob_P_id=-1;
        //glob_P=-1;

        if(glob_sel_0a>0)
        {
          glob_sel_0a=1;
        }
      
        for(pm=0;pm<7;pm++)
        {
          if(glob_sel_Z[pm]>=glob_min_Z)
          {
            mn_arr.push(pm);
            mn=mn+1;
          }
          }
          if(mn_arr.length==0)
          {
            glob_P=-1;
          }
          else if(mn_arr.length==1)
          {
            glob_P=mn_arr[0];
          }
          else
          {
            for(let p=0; p<mn_arr.length; p++)
            {
              if(mn_arr[p]==glob_P)
              {
                glob_P=glob_P;
                break;
              }
            }
        }

        glob_P_id=glob_Pv[glob_P];

        
       
      }


       glob_sel_0a=-1;
       glob_sel_1a=-1;
       glob_sel_2a=-1;
       glob_sel_3a=-1;
       glob_sel_4a=-1;
       glob_sel_5a=-1;
       glob_sel_6a=-1;

       
       glob_min_Z = -1000000-1;
       glob_Pv = [-1,-1,-1,-1,-1,-1,-1];

       glob_sel_Z = [-1000000,-1000000,-1000000,-1000000,-1000000,-1000000,-1000000];
       //var ctxx = canv2D.getContext("2d");
       //var rect = canv2D.getBoundingClientRect();
       //ctxx.clearRect(0, 0, rect.width, rect.height);
       

      for(var i=0; i<NN; i++)
      {

        draw_Elem0(timeStamp, xrnd_c, yrnd_c, 
          g_objs[i],
          u_Matrix, /*vpMatrix,*/ u_MvpMatrix, /*mm_normalMatrix,*/ uu_NormalMatrix);
      }
      draw_line();
      
    }
    
    draw_2D();
    

    m_iter=m_iter+0.05;
    if(m_iter>0){m_iter=0;}
    mm_old_curr_Date=curr_Date;
    
  }

  function draw_Elem0(time, nx, ny, 
    m_obj,
    u_Matrix, /*vpMatrix,*/ u_MvpMatrix, /*mm_normalMatrix,*/ uu_NormalMatrix) 
  {
    var RotationSpeed, xRotationDir, yRotationDir, zRotationDir;
    var c_x, c_y, c_z;
    var c_xScale, c_yScale, c_zScale;
    var c_Rotation, c_xRotationDir, c_yRotationDir, c_zRotationDir;

    if(m_obj.x==10 && m_obj.y==0 && m_obj.z==mm_qe-1)
    {
      m_obj;
    }
  
    g_Matrix1a.set(g_Matrix1);
    
    //g_Matrix1b.set(g_Matrix1c);
    
    //g_Matrix1b.rotate(mm_mode1*rot_y*1, 0.0, 1.0, 0.0); // Rotation around y-axis
    //g_Matrix1b.rotate(mm_step*1, 0.0, 1.0, 0.0); // Rotation around y-axis
  
    //g_Matrix1a.set(g_Matrix1b);
    let m_iter_m=0;//m_iter;
    if(1==1/*m_iter!=0*/)
    {

      if(m_iter>=0)
      {
        m_iter_m=0;
      }
      else if(m_obj.Delay>m_iter)
      {
        m_iter_m=-1;
      }
      else{m_iter_m=m_iter-1-m_obj.Delay;}
      RotationSpeed=m_obj.RotationSpeed-m_obj.d_RotationSpeed*m_iter_m;
      xRotationDir =m_obj.xRotationDir -m_obj.d_xRotationDir *m_iter_m;
      yRotationDir =m_obj.yRotationDir -m_obj.d_yRotationDir *m_iter_m;
      zRotationDir =m_obj.zRotationDir -m_obj.d_zRotationDir *m_iter_m;
      
      c_x=m_obj.c_x-m_obj.d_c_x*m_iter_m;
      c_y=m_obj.c_y-m_obj.d_c_y*m_iter_m;
      c_z=m_obj.c_z-m_obj.d_c_z*m_iter_m;

      c_xScale=m_obj.c_xScale-m_obj.d_c_xScale*m_iter_m;
      c_yScale=m_obj.c_yScale-m_obj.d_c_yScale*m_iter_m;
      c_zScale=m_obj.c_zScale-m_obj.d_c_zScale*m_iter_m;

      c_Rotation    =m_obj.c_Rotation    -m_obj.d_c_Rotation*m_iter_m;
      c_xRotationDir=m_obj.c_xRotationDir-m_obj.d_c_xRotationDir*m_iter_m;
      c_yRotationDir=m_obj.c_yRotationDir-m_obj.d_c_yRotationDir*m_iter_m;
      c_zRotationDir=m_obj.c_zRotationDir-m_obj.d_c_zRotationDir*m_iter_m;

    }

    if(RotationSpeed!=0 && (xRotationDir!=0 || yRotationDir!=0 || zRotationDir!=0))
    {
      g_Matrix1a.rotate(RotationSpeed*time, xRotationDir, yRotationDir, zRotationDir); // Rotation around x-axis
    }

    if(c_x!=0 || c_y!=0 || c_z!=0)
    {
      g_Matrix1a.translate(c_x, c_y, c_z); 　　　// Move to joint1
    }

    if(c_xScale!=1 || c_yScale!=1 || c_zScale!=1)
    {
      g_Matrix1a.scale(c_xScale,c_yScale,c_zScale); // Scale elem
    }
  
    if(c_Rotation!=0 && (c_xRotationDir!=0 || c_yRotationDir!=0 || c_zRotationDir!=0))
    {
      g_Matrix1a.rotate(m_obj.c_RotationF*((c_x*c_x*nx + c_y*c_y*ny /*- sh_x*sh_y*/) )/*((sh_x+5000)/(sh_y+2000))*/ + c_Rotation*time, /*-0.5 + (sh_x-sh_y)-Math.floor(sh_x-sh_y)*/ c_xRotationDir,  /*-0.5+sh_x/sh_y-Math.floor(sh_x/(sh_y))*/ c_yRotationDir, c_zRotationDir); // Rotation around x-axis
    }
  

    gl.uniformMatrix4fv(u_Matrix, false, g_Matrix1a.elements);
  
    if(1==1)//if(m_obj.x==0 && m_obj.y==0 && m_obj.z==0)
    {
      g_Matrix3.setInverseOf(g_Matrix1a);
      g_Matrix3.transpose();
      gl.uniformMatrix4fv(uu_NormalMatrix, false, g_Matrix3.elements);
    }

    //gl.uniform4fv(u_Cust_color , cust_color ); 
    gl.uniform4fv(u_Cust_colorm, m_obj.cust_colorm); 

    //if(nx)

    gl.uniform1f(u_Block_dark,m_obj.Dark_K);   // Darkness of Block
    var ds=9.0; //20;
    var dp=0.5;//*1/c_xScale;

    

    if((mm_mode_F==3||mm_mode_F==4) && (m_iter>-0.1 || mm_mode_F_old==3||mm_mode_F_old==4))
    {
      //if(m_obj.id<=76010/*7618*/ /*&& glob_click==1*/)
      if((glob_sel_0a<10 && m_obj.Phase>0) || (glob_sel_1a<0 && m_obj.x==glob_sh_x0) || (glob_sel_2a<0 && m_obj.x==glob_sh_x1-1) || (glob_sel_3a<0 && m_obj.y==glob_sh_y0) || (glob_sel_4a<0 && m_obj.y==glob_sh_y1-1) || (glob_sel_5a<0 && m_obj.z==glob_sh_z0) || (glob_sel_6a<0 && m_obj.z==glob_sh_z1-1))
      {
        var zz=0.9;
        var MMAT = new Matrix4(); //=[1,0,0,0,0,1,0,0,0,0,1,zz,0,0,0,1];

        var P0b = new Vector4([0, 0, 0, 1]);
        //mvpMatrix
        var P00;
        var P1; // = new Vector4(0,0,0,0);

        P1  =g_Matrix1a.multiplyVector4(P0b);

        P1.elements[0]=P1.elements[0]/(2-P1.elements[2]/36);
        P1.elements[1]=P1.elements[1]/(2-P1.elements[2]/36);

        glob_click=0;


        var r_sp_mouse_x = (2*sp_mouse_x-1) * (WND_width/WND_height); 

        if(Math.abs(P1.elements[0]-r_sp_mouse_x*ds-0*dp)<dp/c_xScale && Math.abs(P1.elements[1]-(-2*sp_mouse_y+1)*ds-0*dp)<dp/c_yScale )
        {
          if(m_obj.x==0 || m_obj.x==mm_qe-1 || m_obj.y==0 || m_obj.y==mm_qe-1 || m_obj.z==0 || m_obj.z==mm_qe-1)
          {
            glob_click=0;
          }

          
          if(m_obj.Phase>0)
          {
            glob_sel_0a=1;

            if(m_obj.Phase==2)
            {
              glob_Pv[6] =m_obj.id;
              glob_sel_Z[6]=1000000;
              glob_min_Z=1000000;
            }
            else
            {
              if(glob_min_Z<=P1.elements[2])
              {
                glob_min_Z=P1.elements[2];
                //glob_sel_1a=m_obj.id;
                glob_Pv[6] =m_obj.id;
                glob_sel_Z[6]=P1.elements[2];

              }
            }
          }
          else 
          {
            if(m_obj.x==glob_sh_x0)
            {
              glob_sel_1a=1;

              if(glob_min_Z<=P1.elements[2])
              {
                glob_min_Z=P1.elements[2];
                //glob_sel_1a=m_obj.id;
                glob_Pv[0] =m_obj.id;
                glob_sel_Z[0]=P1.elements[2];
              }
            }
            else if(m_obj.x==glob_sh_x1-1)
            {
              glob_sel_2a=1;
              if(m_obj.z<15)
              {
                glob_click=0;
              }

              if(glob_min_Z<=P1.elements[2])
              {
                glob_min_Z=P1.elements[2];
                //glob_sel_1a=m_obj.id;
                glob_Pv[1] =m_obj.id;
                glob_sel_Z[1]=P1.elements[2];
              }
            }
            
            if(m_obj.y==glob_sh_y0)
            {
              glob_sel_3a=1;
              if(m_obj.y==glob_sh_y0)
              {
                glob_click=0;
              }
              if(glob_min_Z<=P1.elements[2])
              {
                glob_min_Z=P1.elements[2];
                //glob_sel_1a=m_obj.id;
                glob_Pv[2] =m_obj.id;
                glob_sel_Z[2]=P1.elements[2];
              }
            }
            else if(m_obj.y==glob_sh_y1-1)
            {
              glob_sel_4a=1;
              if(glob_min_Z<=P1.elements[2])
              {
                glob_min_Z=P1.elements[2];
                //glob_sel_1a=m_obj.id;
                glob_Pv[3] =m_obj.id;
                glob_sel_Z[3]=P1.elements[2];
              }
            }
            
            if(m_obj.z==glob_sh_z0)
            {
              glob_sel_5a=1;
              if(glob_min_Z<=P1.elements[2])
              {
                glob_min_Z=P1.elements[2];
                //glob_sel_1a=m_obj.id;
                glob_Pv[4] =m_obj.id;
                glob_sel_Z[4]=P1.elements[2];
              }
            }
            else if(m_obj.z==glob_sh_z1-1)
            {
              glob_sel_6a=1;
              if(m_obj.x==16)
              {
                glob_click=0;
              }
              if(glob_min_Z<=P1.elements[2])
              {
                glob_min_Z=P1.elements[2];
                //glob_sel_1a=m_obj.id;
                glob_Pv[5] =m_obj.id;
                glob_sel_Z[5]=P1.elements[2];
              }
            }
          }
        }
      }
      
      let mi=-1;
      let v_Block_dark=0.3;
      if(glob_P>=-10)
      {
        gl.uniform1f(u_Mark,0.0); 
        mi=glob_P_id;
        if(mi>=0)
        {
        if(glob_P==6)
        {
          if(m_obj.x==g_objs[mi].x && m_obj.y==g_objs[mi].y && m_obj.z==g_objs[mi].z)
          {
            gl.uniform1f(u_Block_dark,v_Block_dark);
            gl.uniform1f(u_Mark,1.0); 
          }
        }
        else if(glob_P==0)//glob_sel_1>-1)
        {
          if((m_obj.z==g_objs[mi].z || m_obj.y==g_objs[mi].y) && m_obj.Phase==0)
          {
            gl.uniform1f(u_Block_dark,v_Block_dark);
            gl.uniform1f(u_Mark,1.0); 
          }
        }
        else if(glob_P==1)
        {
          if((m_obj.z==g_objs[mi].z || m_obj.y==g_objs[mi].y) && m_obj.Phase==0)
          {
            gl.uniform1f(u_Block_dark,v_Block_dark);
            gl.uniform1f(u_Mark,1.0); 
          }
        }
        else if(glob_P==2)
        {
          if((m_obj.z==g_objs[mi].z || m_obj.x==g_objs[mi].x) && m_obj.Phase==0)
          {
            gl.uniform1f(u_Block_dark,v_Block_dark);
            gl.uniform1f(u_Mark,1.0); 
          }
        }
        else if(glob_P==3)
        {
          if((m_obj.z==g_objs[mi].z || m_obj.x==g_objs[mi].x) && m_obj.Phase==0)
          {
            gl.uniform1f(u_Block_dark,v_Block_dark);
            gl.uniform1f(u_Mark,1.0); 
          }
        }
        else if(glob_P==4)
        {
          if((m_obj.x==g_objs[mi].x || m_obj.y==g_objs[mi].y) && m_obj.Phase==0)
          {
            gl.uniform1f(u_Block_dark,v_Block_dark);
            gl.uniform1f(u_Mark,1.0); 
          }
        }
        else if(glob_P==5)
        {
          if((m_obj.x==g_objs[mi].x || m_obj.y==g_objs[mi].y) && m_obj.Phase==0)
          {
            gl.uniform1f(u_Block_dark,v_Block_dark);
            gl.uniform1f(u_Mark,1.0); 
          }
        }
        }
      }
      

      Pos_type[0]=m_obj.Pos_type_x;
      Pos_type[1]=m_obj.Pos_type_y;
      Pos_type[2]=m_obj.Pos_type_z;
      gl.uniform3fv(u_Pos_type, Pos_type);
    }

    
  
  
    
    gl.drawElements(gl.TRIANGLES, gl_N, gl.UNSIGNED_BYTE, 0);   // Draw the cube

  }

  function draw_line()
  {
    ;
  }

  function draw_2D()
  {
    //var ctx = hud.getContext('2d');
    
    view_panel(hud,ctx);
    

    if(show_2d==1)
    {
      draw_2D_content();
    }

    if(mm_login_mode> 0)
    {
      if(mm_login_mode==1)
      {
        if(mm_str_lgn=="")
        {
          draw_2D_str(ctx,"Login?", iter_login,   3, 0,100,255,0.0, 1.0, 26, 26, hud.width/2, hud.width/2, hud.height/2, hud.height/2, "center",2);
          draw_2D_str(ctx,"Login?", iter_login, 0.2, 0,150,255,0.0, 0.3, 26, 26, hud.width/2, hud.width/2, hud.height/2, hud.height/2, "center");
        }
        else
        {
          draw_2D_str(ctx,mm_str_lgn, iter_login, 1, 0,0,255,0.9, 0.9, 26, 26, hud.width/2, hud.width/2, hud.height/2, hud.height/2, "center");
        }
      }
      else if(mm_login_mode==2)
      {
        if(mm_str_pwd=="")
        {
          draw_2D_str(ctx,"Password?", iter_login,   3, 0,100,255,0.0, 1.0, 26, 26, hud.width/2, hud.width/2, hud.height/2, hud.height/2, "center",2);
          draw_2D_str(ctx,"Password?", iter_login, 0.2, 0,150,255,0.0, 0.3, 26, 26, hud.width/2, hud.width/2, hud.height/2, hud.height/2, "center");
          //draw_2D_str(ctx,"Password?", iter_login, 1, 0,100,255,0.9, 0.9, 30, 30, hud.width/2, hud.width/2, hud.height/2, hud.height/2, "center");
        }
        else
        {
          
          draw_2D_str(ctx,hide_pwd(mm_str_pwd), iter_login, 1, 100,0,255,0.9, 0.9, 26, 26, hud.width/2, hud.width/2, hud.height/2, hud.height/2, "center");
        }
      }
      else if(mm_login_mode==3)
      {
        draw_2D_str(ctx,mm_str_lgn, iter_login, 1.0, 100,100,130,0.9, 0.0, 26, 100 , hud.width/2, hud.width/2, hud.height/2-30, hud.height/2-30, "center");
        draw_2D_str(ctx,mm_str_pwd, iter_login, 0.2, 100,100,130,0.9, 0.0, 26, 26  , hud.width/2, hud.width/2, hud.height/2+30, hud.height/2+30, "center");
      } 
      else if(mm_login_mode==4)
      {
        draw_2D_str(ctx,mm_dlg_str, iter_login, 0.5, 255,100,90,0.9, 0.0, 26, 26  , hud.width/2, hud.width/2, hud.height/2, hud.height/2, "center");
      }



      if(iter_login<0)
      {
        iter_login=iter_login + iter_login_s;
      }
      else
      {
        iter_login=0;
        iter_login_s=0.1;
        mm_dlg_str="";
        if(mm_login_mode==4)
        {
          mm_login_mode=0;
        }
      }
    }

  }

  function hide_pwd(pwd)
  {
    var ret="";
    var L=pwd.length;
    var n=0;//Math.floor(rand(97,97+27));
    var ss="";
    for(var i=0; i<L-1; i++)
    {
      n=Math.floor(rand(97,97+27));
      ss=String.fromCharCode(n);
      ret=ret+ss;
    }
    ret=ret+pwd.substring(L-1, L);
    return ret;
  }

  function draw_2D_str(ctx,m_str, iter_s, iter_func, r,g,b,a, a1, sz, sz1, xx, xx1, yy, yy1, w_pos, mode)
  {
    if(mode==2)
    {
      iter_s=Math.pow(1-2*Math.abs(+0.5+iter_s),iter_func);
    }
    else
    {
      iter_s=Math.pow((1+iter_s),iter_func);
    }
    a =a +iter_s*(a1-a);
    sz=sz+iter_s*(sz1-sz);

    xx=xx+iter_s*(xx1-xx);
    yy=yy+iter_s*(yy1-yy);

    //yy=yy+iter_s*d_yy;

    //yy=yy+(1+iter_login)*100;
    //
    //ctx.strokeStyle = 'rgba('+r+','+g+','+b+','+a+')';
    ctx.fillStyle = 'rgba('+r+','+g+','+b+','+a+')';
    ctx.font = sz+"pt monospace"; //Arial";
    //ctx.font = "20px Arial";
    ctx.textBaseline = "middle"; //"bottom";
    ctx.textAlign = w_pos;
    ctx.fillText(m_str,xx,yy);
  }


  function draw_2D_content()
  {
    if(n_main_DGRM_sh<0)
    {
      zoom_move_DGRM(n_main_DGRM);
      disp_all_elem_1(1);
      n_main_DGRM_sh=n_main_DGRM_sh+0.1;
    }
    else if(n_main_DGRM_sh>0)
    {
      n_main_DGRM_sh=0;
    }
    
    
  }
  redraw2D=0;

}




function set_mvpMatrix(k_wh)
{
  //mvpMatrix.setPerspective(30, k_wh, 1, 1000);
  mvpMatrix.setPerspective(30, k_wh, 0.1, 1000);
  mvpMatrix0.setPerspective(40, 1, 0.1, 1000);
  //mvpMatrix.lookAt(eye[0], eye[1], eye[2], 0, 2, 0, 0, 1, 0);
  mvpMatrix.lookAt(eye[0], eye[1], eye[2], 0, 0, 0, 0, 1, 0);
}


function keydown(ev/*, m_gl, n, u_FogDist, fogDist*/, /*modelMatrix,*/ /*vpMatrix, u_ModelMatrix, u_MvpMatrix, u_NormalMatrix, currentAngle*/) {
  //m_ang_v2=0;
  //m_ang_h2=0;
  m_ang_v =0;
  m_ang_h =0;
  m_ang_v2_ =0;
  m_ang_h2_ =0;
  switch (ev.keyCode) {
    case 27: // Esc
      mm_passive=0;
      //mm_mode1=1-mm_mode1;
      if(mm_mode_F==2)
      {
        mm_mode_F_old=mm_mode_F;
        mm_mode_F=1;
        change_mode_F();
      }
      break;
    case 34: // Up arrow key -> Increase the maximum distance of fog
      fogDist[1]  += 1;
      m_ang_v=0;
      m_ang_h=0;
      //fogDist[0]  += 1;
      break;
    case 33: // Down arrow key -> Decrease the maximum distance of fog
      if (fogDist[1] > fogDist[0]) fogDist[1] -= 1;
      m_ang_v=0;
      m_ang_h=0;
      //fogDist[1] -= 1;
      //fogDist[0] -= 1;
      break;
    case 40: // Left arrow key -> turn left
      m_ang_h=0;
      m_ang_v  =10;//+= 10;
      //modelMatrix.rotate(m_ang,0,1,0);
      break;
    case 38: // Right arrow key -> turn right
      m_ang_h=0;
      m_ang_v =-10;//-= 10;
      //modelMatrix.rotate(m_ang,0,1,0);
      break;
    case 39: // Left arrow key -> turn left
      m_ang_v=0;
      m_ang_h =10;// += 10;
      //modelMatrix.rotate(m_ang,0,1,0);
      break;
    case 37: // Right arrow key -> turn right
      m_ang_v=0;
      m_ang_h =-10;//-= 10;
      //modelMatrix.rotate(m_ang,0,1,0);
      break;
    /*
    case 65: // Left arrow key -> turn left
      m_ang_v2_=1;
      m_ang_v2+=1;
      //modelMatrix.rotate(m_ang,0,1,0);
      break;
    
    case 90: // Right arrow key -> turn right
      m_ang_v2_=-1;
      m_ang_v2-=1;
      //modelMatrix.rotate(m_ang,0,1,0);
      break;
      */
    case 13: // Enter
      if(mm_login_mode==1 || mm_login_mode==2)
      {
        ch_login_status(-1);
      }
      break;

    case 8: // BackSpace
      if(mm_login_mode==1)
      {
        mm_str_lgn=mm_str_lgn.substring(0, mm_str_lgn.length-1);
      }
      else if(mm_login_mode==2)
      {
        mm_str_pwd=mm_str_pwd.substring(0, mm_str_pwd.length-1);
      }
      break;
    
    default:
      /*
      if(mm_login_mode==1)
      {
        mm_str_lgn=mm_str_lgn+ev.key+"("+ev.keyCode+")";
      }
      else if(mm_login_mode==2)
      {
        mm_str_pwd=mm_str_pwd+ev.key+"("+ev.keyCode+")";
      }
      /**/
    //default: alert(ev.keyCode); return;
  }
  if((ev.keyCode>=65 && ev.keyCode<=90) 
  || (ev.keyCode>=48 && ev.keyCode<=57) 
  || (ev.keyCode>=96 && ev.keyCode<=111) 
  || ev.keyCode==192 
  || ev.keyCode==173 
  || ev.keyCode==61
  || ev.keyCode==219 
  || ev.keyCode==220
  || ev.keyCode==221 )
  {
    if(mm_login_mode==1)
      {
        mm_str_lgn=mm_str_lgn+ev.key; //+"("+ev.keyCode+")";
      }
    else if(mm_login_mode==2)
      {
        mm_str_pwd=mm_str_pwd+ev.key; //+"("+ev.keyCode+")";
      }
  }
  
}

function ch_login_status(status)
{
  if(mm_login_mode==0)
  {
    mm_str_lgn="";
    mm_str_pwd="";
    mm_login_mode=1;
    iter_login=-1;
    iter_login_s=0.01;
  }
  else if(mm_login_mode==1)
  {
    mm_str_pwd="";
    mm_login_mode=2;
    iter_login=-1;
    iter_login_s=0.02;
  }
  else if(mm_login_mode==2)
  {
    mm_login_mode=3;
    iter_login=-1;
    iter_login_s=0.1;

    var msg = {
      type: "cmd",
      back_id: "internal",
      cmd_str: "test_pwd",
      m_usr: mm_str_lgn,
      m_pwd: mm_str_pwd
    };

    get_ws_data(msg);

    ;////
  }
}
function enter_result(e_res)
{
  if(mm_mode_F==2 && mm_login_mode==3)
  {
    if(e_res=="OK")
    {
      mm_login_mode=0;
      mm_dlg_str="";
      mm_str_lgn="";
      mm_str_pwd="";
      d_fogDist=-5;
      setTimeout("begin_work("+(-1)+","+0.01+")",200);
      //mm_mode_F_old=mm_mode_F;
      //mm_mode_F=3;
      //change_mode_F();
    }
    else
    {
      mm_str_lgn="";
      mm_str_pwd="";
      iter_login=-1;
      iter_login_s=0.01;
      mm_login_mode=4;
      mm_dlg_str=e_res;
    }
  }
}
function begin_work(step,inc)
{
  var inc_D=10;
  if(step>=0 || d_fogDist==0)
  {
    mm_login_mode=0;
    mm_mode_F_old=mm_mode_F;
    mm_mode_F=3;
    d_fogDist=10;
    change_mode_F();
    
  }
  else
  {
    
    setTimeout("begin_work("+(step+inc)+","+inc+")",50);
  }
}
function draw_GL00(timeStamp) {
  
  if (IS_ACTIVE) {
      //GL.drawArrays(GL.TRIANGLE_STRIP, 0, 4);

      if (INTENSITY < 1) {
          INTENSITY += 0.01;
      }
  } else {
      if (INTENSITY > 0) {
          INTENSITY -= 0.05;
          //GL.drawArrays(GL.TRIANGLE_STRIP, 0, 4);
      }
  }

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, gl_N, gl.UNSIGNED_BYTE, 0);

  requestAnimationFrame(draw_GL00);
}

function hilight(ev)
{
  glob_click=1;
  //show_test_data();
  //return;
  var pixels = new Uint8Array(4); // Array for storing the pixel value
  var x = ev.clientX, y = ev.clientY;
  var rect = CANVAS.getBoundingClientRect();
  if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
    // If Clicked position is inside the <canvas>, update the selected surface
    var x_in_canvas = x - rect.left, y_in_canvas = rect.bottom - y;

    

    var date0=Date.now();
    var timeStamp=Date.now();
    
    var ctx = canv2D.getContext("2d");

    
  }
}
function checkFace(gl, x, y) {
  var pixels = new Uint8Array(4); // Array for storing the pixel value
  //gl.uniform1i(u_PickedFace, 0);  // Draw by writing surface number into alpha value
  //draw(gl, n, currentAngle, viewProjMatrix, u_MvpMatrix);
  // Read the pixel value of the clicked position. pixels[3] is the surface number
  gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  return pixels[3];
}

function initVertexBuffers_Color(m_gl, mode_) {
  // Create a cube
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3

  var colors = new Float32Array([     // Colors
    0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  // v0-v1-v2-v3 front
    0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  // v0-v3-v4-v5 right
    1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  // v0-v5-v6-v1 up
    1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  // v1-v6-v7-v2 left
    1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  // v7-v4-v3-v2 down
    0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0  // v4-v7-v6-v5 back
  //0.2, 0.2, 0.2,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0  // v4-v7-v6-v5 back
  ]);

  var NN=colors.length/4/3;
  if(mode_==1)
  {
    for(var i=0; i<NN; i++)
    {
      colors[12*i+0] = 0.1*rand_10(); //rand(0,1);
      colors[12*i+1] = 0.9*rand_10(); //rand(0,1);
      colors[12*i+2] = 0.9*rand_10(); //rand(0,1);

      colors[12*i+3]=colors[12*i+0];
      colors[12*i+4]=colors[12*i+1];
      colors[12*i+5]=colors[12*i+2];

      colors[12*i+6]=colors[12*i+0];
      colors[12*i+7]=colors[12*i+1];
      colors[12*i+8]=colors[12*i+2];

      colors[12*i+9]=colors[12*i+0];
      colors[12*i+10]=colors[12*i+1];
      colors[12*i+11]=colors[12*i+2];
    }
  }

  // Write the vertex property to buffers (coordinates and normals)
  if (!initArrayBuffer(m_gl,   colors, 3, m_gl.FLOAT, 'a_Color')) return -1;

  return 0;
}

function initVertexBuffers(m_gl) {
  // Create a cube
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3

  var vertices = new Float32Array([   // Vertex coordinates
     1, 1, 1,  -1, 1, 1,  -1,-1, 1,   1,-1, 1,    // v0-v1-v2-v3 front
     1, 1, 1,   1,-1, 1,   1,-1,-1,   1, 1,-1,    // v0-v3-v4-v5 right
     1, 1, 1,   1, 1,-1,  -1, 1,-1,  -1, 1, 1,    // v0-v5-v6-v1 up
    -1, 1, 1,  -1, 1,-1,  -1,-1,-1,  -1,-1, 1,    // v1-v6-v7-v2 left
    -1,-1,-1,   1,-1,-1,   1,-1, 1,  -1,-1, 1,    // v7-v4-v3-v2 down
     1,-1,-1,  -1,-1,-1,  -1, 1,-1,   1, 1,-1     // v4-v7-v6-v5 back
   //0, 0,-1.4, 1,-1,-1,  -1,-1,-1,  -1, 1,-1,   1, 1,-1     // v4-v7-v6-v5 back
  ]);

  var colors = new Float32Array([     // Colors
    0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  // v0-v1-v2-v3 front
    0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  // v0-v3-v4-v5 right
    1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  // v0-v5-v6-v1 up
    1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  // v1-v6-v7-v2 left
    1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  // v7-v4-v3-v2 down
    0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0  // v4-v7-v6-v5 back
  //0.2, 0.2, 0.2,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0  // v4-v7-v6-v5 back
  ]);

  var normals = new Float32Array([    // Normal
    0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0, // v0-v1-v2-v3 front
    1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0, // v0-v3-v4-v5 right
    0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0, // v0-v5-v6-v1 up
   -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // v1-v6-v7-v2 left
    0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0, // v7-v4-v3-v2 down
    0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0  // v4-v7-v6-v5 back
  ]);

  var faces = new Uint8Array([   // Faces
    1, 1, 1, 1,     // v0-v1-v2-v3 front
    2, 2, 2, 2,     // v0-v3-v4-v5 right
    3, 3, 3, 3,     // v0-v5-v6-v1 up
    4, 4, 4, 4,     // v1-v6-v7-v2 left
    5, 5, 5, 5,     // v7-v4-v3-v2 down
    6, 6, 6, 6,     // v4-v7-v6-v5 back
  ]);

  var indices = new Uint8Array([       // Indices of the vertices
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23,    // back
  //20,21,22,  20,22,23, 20,23,24, 20,24,21     
  ]);

  // Write the vertex property to buffers (coordinates and normals)
  if (!initArrayBuffer(m_gl, vertices, 3, m_gl.FLOAT, 'a_Position')) return -1;
  //if (!initArrayBuffer(m_gl,   colors, 3, m_gl.FLOAT, 'a_Color')) return -1;
  if (!initArrayBuffer(m_gl,  normals, 3, m_gl.FLOAT, 'a_Normal')) return -1;
  if (!initArrayBuffer(m_gl,    faces, 1, m_gl.UNSIGNED_BYTE, 'a_Face')) return -1;// Surface Information

  
  // Create a buffer object
  var indexBuffer = m_gl.createBuffer();
  if (!indexBuffer) 
    return -1;
  
  // Write the indices to the buffer object
  m_gl.bindBuffer(m_gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  m_gl.bufferData(m_gl.ELEMENT_ARRAY_BUFFER, indices, m_gl.STATIC_DRAW); // STREAM_DRAW DYNAMIC_DRAW

  return indices.length;
}

function initArrayBuffer (m_gl, data, num, type, attribute) {
  // Create a buffer object
  var buffer = m_gl.createBuffer();
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  // Write date into the buffer object
  m_gl.bindBuffer(m_gl.ARRAY_BUFFER, buffer);
  m_gl.bufferData(m_gl.ARRAY_BUFFER, data, m_gl.STATIC_DRAW);
  // Assign the buffer object to the attribute variable
  var a_attribute = m_gl.getAttribLocation(m_gl.program, attribute);
  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute);
    return false;
  }
  m_gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // Enable the assignment of the buffer object to the attribute variable
  m_gl.enableVertexAttribArray(a_attribute);
  // Unbind the buffer object
  m_gl.bindBuffer(m_gl.ARRAY_BUFFER, null);

  return true;
}

function updateCanvasSize(canvas,gl, hud, ctx) {
  const size = Math.ceil(Math.min(window.innerHeight, window.innerWidth) * .99) - 110;


  const size_h = Math.ceil(window.innerHeight * .999) - 0;//30;//110;
  const size_w = Math.ceil(window.innerWidth  * .999) - 0;//110;

  canvas.height = size_h;
  canvas.width = size_w;

  canv2D.height = size_h;
  canv2D.width = size_w;

  hud.height = size_h;
  hud.width = size_w;

  WND_height=size_h;
  WND_width =size_w;

  if(mm_step_F<10000)
  {redraw2D=1;}

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);


  set_mvpMatrix(size_w/size_h);
  gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

}

function initEventListeners(canvas, gl, hud, ctx, currentAngle, scale) {
  dragging = false;         // Dragging or not
  var lastX = -1, lastY = -1;   // Last position of the mouse

  window.addEventListener('resize', () => {updateCanvasSize(canvas, gl, hud, ctx)});

  hud.addEventListener('mouseover', () => {
      IS_ACTIVE = false;
  });

  hud.addEventListener('mouseout', () => {
      IS_ACTIVE = true;
  });

  hud.addEventListener('mousemove', (ev) => {
      let rect = canvas.getBoundingClientRect();
      var x = ev.clientX;
      var y = ev.clientY;

      let MOUSE_POSITION = [
        ev.clientX - rect.left,
        rect.height - (ev.clientY - rect.top)
    ];

    var context;
    var dx = 0; 
    var dy = 0;
    
    curr_mouse_x=ev.clientX-rect.left;
    curr_mouse_y=rect.bottom-ev.clientY;

    sp_mouse_x=(ev.clientX-rect.left)/(rect.width);
    sp_mouse_y=(ev.clientY-rect.top)/(rect.height);

    if (dragging) {
      mm_passive=0;
      context=canv2D.getContext("2d");
      drop_prev_mouse(context);
      if(mm_mode_F!=1 && mm_mode_F!=2 && !((mm_mode_F_old==1 || mm_mode_F_old==2) && m_iter!=0))
      {
        var factor = 130/canvas.height; // The rotation ratio
        var dx = factor * (x - lastX);
        var dy = factor * (y - lastY);
      // Limit x-axis rotation angle to -90 to 90 degrees
      //currentAngle[0] = Math.max(Math.min(currentAngle[0] + dy, 90.0), -90.0);
      
        currentAngle[0] = currentAngle[0] + dy;
        var sx=1;
        if(currentAngle[0]>180)
        {
          currentAngle[0]=currentAngle[0]-360;
        }
        else if(currentAngle[0]<-180)
        {
          currentAngle[0]=currentAngle[0]+360;
        }
        if(currentAngle[0]>90 || currentAngle[0]<-90)
        {
          sx=-1;
        }
        currentAngle[1] = currentAngle[1] + sx*dx;
        if(currentAngle[1]>180)
        {
          currentAngle[1]=-360+currentAngle[1];
        }
        if(currentAngle[1]<-180)
        {
          currentAngle[1]=360+currentAngle[1];
        }
      }

      
      


    }
    
    if(mm_mode_F==5)
    {
      //disp_all_elem();
      disp_elem2(ev,0 /*move*/,canv2D);

      if(dragging == true && n_main_DGRM>=0)
      {
        dx=sp_mouse_x-sp_mouse_x_old;
        dy=sp_mouse_y-sp_mouse_y_old;
        DGRM_params_nA=DGRM_params[n_main_DGRM].A+dx;
        DGRM_params_nB=DGRM_params[n_main_DGRM].B+dy;
        zoom_move_one_DGRM(n_main_DGRM,DGRM_params_nA,DGRM_params_nB);
        //zoom_move_DGRM(n_main_DGRM);
        disp_all_elem_1(1);
      }
    }

    lastX = x, lastY = y;
    sp_mouse_x_old=sp_mouse_x;
    sp_mouse_y_old=sp_mouse_y;

  });

  hud.addEventListener('mousedown', (ev) => {   // Mouse is pressed
    var x = ev.clientX; 
    var y = ev.clientY;
    // Start dragging if a moue is in <canvas>
    var rect = ev.target.getBoundingClientRect();
    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
      lastX = x; lastY = y;
      dragging = true;
      /// gl.uniform1f(gl.getUniformLocation(gl.program, 'u_dragging'), dragging);
      
      
    }
    if(but_control(x-rect.left,y-rect.top)>=0)
    {
      mm_passive=0;
      var context=canv2D.getContext("2d");
      drop_prev_mouse(context);
      //view_panel(hud,ctx);
      
    }
    
    //if()
  });

  hud.addEventListener('mouseup', (ev) => { 
    dragging = false;  
    /// gl.uniform1f(gl.getUniformLocation(gl.program, 'u_dragging'), dragging);
    
  });

  hud.addEventListener('wheel', (ev) => { 

    mm_passive=0;
    if(show_2d==1)
    {
      var context=canv2D.getContext("2d");
      drop_prev_mouse(context);
    }
    //ev.preventDefault();

    //mm_scale=ev.deltaY;

    if(mm_mode_F!=1 && mm_mode_F!=2) // && !((mm_mode_F_old==1 || mm_mode_F_old==2) && m_iter!=0))
    {

      mm_scale += ev.deltaY * 0.001;

      // Restrict scale
      mm_scale = Math.min(Math.max(0.0, mm_scale), 20);
    }

    // Apply scale transform
    //el.style.transform = `scale(${scale})`;
  });

  hud.addEventListener('dblclick', (ev) => { 

    var context=canv2D.getContext("2d");
    drop_prev_mouse(context);

    mm_passive=0;
    mm_mode1=1-mm_mode1;
    if(mm_mode_F==1)
    {
      mm_mode_F_old=mm_mode_F;
      mm_mode_F=2;
      //mm_login_mode=-1;
      change_mode_F();
      //ch_login_status(-1);
    }
    else if(mm_mode_F==2)
    {
      ch_login_status(-1);
    }
    else if(mm_mode_F==3 || mm_mode_F==4)
    {
      //hilight(ev);
      sel_cube();
    }
    else if(mm_mode_F==5)
    {
      //DGRM_prepare();
      if(n_main_DGRM < 0)
      {
        n_main_DGRM=is_area_num(ev.clientX/canv2D.clientWidth, ev.clientY/canv2D.clientHeight);
        if(n_main_DGRM>=0)
        {
          n_main_DGRM_sh=-1.0;
        }
      }
      else
      {
        DGRM_prepare();
        n_main_DGRM=-1;
      }
      
      zoom_one_DGRM(n_main_DGRM);
      disp_all_elem_0(); //(ev,0 /*move*/,canv2D,1);

    }
    //hilight(ev);
  });
}

function apply_gl_data(new_js)
{
  mm_sender=1;
  mm_passive=1;
  mm_currentAngle[0]=new_js.currentAngle_0;
  mm_currentAngle[1]=new_js.currentAngle_1;
  mm_step=new_js.mm_step;
  mm_scale=new_js.mm_scale;
  mm_mode1=new_js.mm_mode1;
  

  if(mm_mode_F!=new_js.mm_mode_F)
  {
    mm_mode_F_old=mm_mode_F;
    mm_mode_F=new_js.mm_mode_F;

    change_mode_F();
    //var ctx = hud.getContext('2d');
    //view_panel(hud,ctx);
  }
  if(mm_mode_F==3 || mm_mode_F==4)
  {
    if(mm_passive==1)
    {
      if(sp_mouse_x!=new_js.mm_sp_mouse_x || sp_mouse_y!=new_js.mm_sp_mouse_y)
      {
        sp_mouse_x=new_js.mm_sp_mouse_x;
        sp_mouse_y=new_js.mm_sp_mouse_y;
      }
      if(glob_P!=new_js.mm_glob_P || glob_P_id!=new_js.mm_glob_P_id)
      {
        glob_P   =new_js.mm_glob_P;
        glob_P_id=new_js.mm_glob_P_id;
      }
      if(glob__P!=new_js.mm_glob__P || glob__P_id!=new_js.mm_glob__P_id)
      {
        glob__P   =new_js.mm_glob__P;
        glob__P_id=new_js.mm_glob__P_id;
        glob_P    =glob__P;
        glob_P_id =glob__P_id;
        sel_cube();
      }
    }
  }
  if(mm_mode_F==5)
  {
    var context=canv2D.getContext("2d");
    if(n_main_DGRM!=new_js.mm_n_main_DGRM)
    {
      drop_prev_mouse(context);
      DGRM_prepare();
      n_main_DGRM=new_js.mm_n_main_DGRM;
      if(n_main_DGRM>=0)
      {
        n_main_DGRM_sh=-1.0;
      }
      zoom_one_DGRM(n_main_DGRM);
      disp_all_elem_0();//(ev,0 /*move*/,canv2D,1);
    }
    if(mm_passive==1)
    {
      if(sp_mouse_x!=new_js.mm_sp_mouse_x || sp_mouse_y!=new_js.mm_sp_mouse_y || dragging!=new_js.mm_dragging || DGRM_params_nA!=new_js.mm_DGRM_params_nA || DGRM_params_nB!=new_js.mm_DGRM_params_nB)
      {
        var ww=canv2D.clientWidth;
        var hh=canv2D.clientHeight;
        var R = 5;
        var S = 16;
        

        drop_prev_mouse(context);
        
        sp_mouse_x=new_js.mm_sp_mouse_x;
        sp_mouse_y=new_js.mm_sp_mouse_y;
        dragging  =new_js.mm_dragging;
        DGRM_params_nA=new_js.mm_DGRM_params_nA;
        DGRM_params_nB=new_js.mm_DGRM_params_nB;
        

        if(n_main_DGRM_sh==0)
        {
          if(dragging==false)
          {
            sp_mouse_x_img=new_js.mm_sp_mouse_x;
            sp_mouse_y_img=new_js.mm_sp_mouse_y;

            sp_old_img.data=context.getImageData(sp_mouse_x*ww-S-6,sp_mouse_y*hh-S-6, 2*(S+6),2*(S+6));
            context.fillStyle = "#EEFF66";
            context.strokeStyle = "#EEFF66";
            context.lineWidth=3;
            context.beginPath();
            context.arc(sp_mouse_x*ww,sp_mouse_y*hh, R, 0, 2*Math.PI, false);
            context.fill();
            context.moveTo(sp_mouse_x*ww+S,sp_mouse_y*hh+S);
            context.lineTo(sp_mouse_x*ww-S,sp_mouse_y*hh-S);
            context.moveTo(sp_mouse_x*ww-S,sp_mouse_y*hh+S);
            context.lineTo(sp_mouse_x*ww+S,sp_mouse_y*hh-S);
            context.stroke();
          }
          if(dragging==true && n_main_DGRM>=0)
          {
            //dx=sp_mouse_x-sp_mouse_x_old;
            //dy=sp_mouse_y-sp_mouse_y_old;
            //zoom_move_one_DGRM(n_main_DGRM,dx,dy);


            DGRM_params[n_main_DGRM].Z=0.7;
            DGRM_params[n_main_DGRM].A=DGRM_params_nA;
            DGRM_params[n_main_DGRM].B=DGRM_params_nB;
            //zoom_move_DGRM(n_main_DGRM);
            disp_all_elem_1(1);
          }
        }

        sp_mouse_x_old=sp_mouse_x;
        sp_mouse_y_old=sp_mouse_y;

      }
    }
  }
}

function sel_cube()
{
  if(mm_mode_F==3 || mm_mode_F==4)
  {
    //hilight(ev);
    mm_mode_F_old=mm_mode_F;
    m_iter=-1;
    var c_re=0;

    let glob_P_L=glob_P;
    let glob_P_id_L=glob_P_id;
    
    if(glob__PP==6)
    {
      glob_P_L   =glob__P_old;
      glob_P_id_L=glob__P_id_old;
      glob__PP=-1;
    }

    //glob__P_old=glob__P;
    glob__P   =glob_P_L;
    glob__P_id=glob_P_id_L;

    if(glob_P_L>=0 && glob_P_L<6 && glob_P_id_L>=0 /*&& glob__P_old<0*/)
    {
      mm_mode_F_3D=-1;
      set_model(mm_mode_F, 1, c_re, hud.width,hud.height);

      glob_sh_x0=0;
      glob_sh_x1=mm_qe;
      glob_sh_y0=0;
      glob_sh_y1=mm_qe;
      glob_sh_z0=0;
      glob_sh_z1=mm_qe;

      glob_6_z=Math.floor(glob_P_id_L/mm_qe/mm_qe);
      glob_6_y= Math.floor((glob_P_id_L-glob_6_z*mm_qe*mm_qe)/mm_qe);
      glob_6_x=glob_P_id_L-glob_6_z*mm_qe*mm_qe-glob_6_y*mm_qe;

      if(glob_P_L==0||glob_P_L==1)
      {
        if(glob_6_y==0)
        {glob_sh_y0=1;}
        else if(glob_6_y==mm_qe-1)
        {glob_sh_y1=glob_6_y;}
        if(glob_6_z==0)
        {glob_sh_z0=1;}
        else if(glob_6_z==mm_qe-1)
        {glob_sh_z1=glob_6_z;}
      }
      else if(glob_P_L==2||glob_P_L==3)
      {
        if(glob_6_x==0)
        {glob_sh_x0=1;}
        else if(glob_6_x==mm_qe-1)
        {glob_sh_x1=glob_6_x;}
        if(glob_6_z==0)
        {glob_sh_z0=1;}
        else if(glob_6_z==mm_qe-1)
        {glob_sh_z1=glob_6_z;}
      }
      else if(glob_P_L==4||glob_P_L==5)
      {
        if(glob_6_x==0)
        {glob_sh_x0=1;}
        else if(glob_6_x==mm_qe-1)
        {glob_sh_x1=glob_6_x;}
        if(glob_6_y==0)
        {glob_sh_y0=1;}
        else if(glob_6_y==mm_qe-1)
        {glob_sh_y1=glob_6_y;}
      }
      glob__P_old=glob_P_L;
      glob__P_id_old=glob_P_id_L;
      glob__PP=-1;
      glob__PP_id=-1;
    }
    else if(glob_P_L==6 && glob__PP==-1 && glob_P_id_L>=0)
    {
      glob__PP=glob_P_L;
      glob__PP_id=glob_P_id_L;
      mm_mode_F_3D=-1;
      set_model(mm_mode_F, 2, c_re, hud.width,hud.height);
      glob_sh_x0=0;
      glob_sh_x1=mm_qe;
      glob_sh_y0=0;
      glob_sh_y1=mm_qe;
      glob_sh_z0=0;
      glob_sh_z1=mm_qe;
    }
    else
    {
      glob_P=-1;
      glob__P=-1;
      glob__P_old=-1;
      glob__P_id_old=-1;
      glob__PP=-1;
      glob__PP_id=-1;
      mm_mode_F_3D=-1;
      set_model(mm_mode_F, 0, c_re, hud.width,hud.height);
      glob_sh_x0=0;
      glob_sh_x1=mm_qe;
      glob_sh_y0=0;
      glob_sh_y1=mm_qe;
      glob_sh_z0=0;
      glob_sh_z1=mm_qe;
    }

    

  }
}

function drop_prev_mouse(ctx)
{
  var ww=canv2D.clientWidth;
  var hh=canv2D.clientHeight;
  var R = 5;
  var S = 16;
  if(sp_old_img.data!=-1)
  {
    ctx.putImageData(sp_old_img.data,sp_mouse_x_img*ww-S-6,sp_mouse_y_img*hh-S-6);
  }
  sp_old_img.data = -1;
  sp_mouse_y_img  = -1;
  sp_mouse_y_img  = -1;
}

function view_panel(hud,context)
{
  //var canvas = document.getElementById('webgl');
  //var context = hud.getContext("2d");
  
  var size_h=hud.height;
  var size_w=hud.width;

  //hud.height = size_h;
  //hud.width = size_w;

  context.clearRect(0, 0, hud.width, hud.height);

  
  mm_mode_but_coords=[];
  for(var i=0; i<6; i++)
  {
    view_mode_button(i,context,size_w,size_h);
  }
}
function view_mode_button(n_but,context,size_w,size_h)
{
  var n_but_m = but_mode[n_but];
  if(n_but_m>=1 && n_but_m<=5)
  {
    context.fillStyle = '#555566';
    if(mm_mode_F==n_but_m)
    {
      context.fillStyle = '#66AA77';
    }
    context.fillRect(size_w-60,30+50*(n_but),40,40);
    var objj={ax: size_w-60, ay: 30+50*(n_but), bx: size_w-60+40, by: 30+50*(n_but)+40};
    mm_mode_but_coords.push(objj);
  }
  else if(n_but_m==1000)
  {
    context.fillStyle = '#555566';
    if(m_sender==1)
    {
      if(mm_passive==0)
      {
        context.fillStyle = '#EE8877';
      }
      else
      {
        context.fillStyle = '#EEEE33';
      }
    }
    context.fillRect(size_w-60,45+50*(n_but),40,40);
    var objj={ax: size_w-60, ay: 45+50*(n_but), bx: size_w-60+40, by: 45+50*(n_but)+40};
    mm_mode_but_coords.push(objj);
  }
}
function is_on_but(x,y)
{
  
  for(var i=0;i<mm_mode_but_coords.length; i++)
  {
  //mm_mode_but_coords.forEach(function(objj) {
    if(x>mm_mode_but_coords[i].ax && x<mm_mode_but_coords[i].bx && y>mm_mode_but_coords[i].ay && y<mm_mode_but_coords[i].by)
    {
      return i;
    }
  };
  return -1;
}
function but_control(x,y)
{
  var mb=is_on_but(x,y);
  //var mm_mode_F_old=0;
  var c_re=1;
  if(mb>=0)
  {
    if(mb>=0 && mb<5)
    {
      mm_mode_F_old=mm_mode_F;
      if(mm_mode_F==but_mode[mb])
      {
        //mm_mode_F=0;
      }
      else
      {
        mm_mode_F=but_mode[mb];
      }
    
      change_mode_F();
    }
    if(mb==5)
    {
      
      if(m_sender==0)
      {
        mm_passive=1;
        var msg = {
          type: "cmd",
          back_id: "local3_1",
          cmd_str: "gl_data_distr",
          cmd_int: 1
        };

        get_ws_data(msg);
        m_sender=1;
        setTimeout("delay_sender_on()",500);
      }
      else if(m_sender==1)
      {
        var msg = {
          type: "cmd",
          back_id: "local3_1",
          cmd_str: "gl_data_distr",
          cmd_int: 10
        };

        get_ws_data(msg);
        m_sender=0;
        mm_sender=0;
      }
    }
  }
  return mb;
}
function delay_sender_on()
{
  mm_sender=1;
}

function change_mode_F()
{
  if(mm_mode_F>=0)
  {
    var c_re=1;
    FL_cur=FL; //0;
    m_iter=-1;
    if(mm_mode_F_3D==mm_mode_F)
    {
      m_iter=0;
    }
    
    if((mm_mode_F_old==1 && mm_mode_F==2) || (mm_mode_F_old==2 && mm_mode_F==1) || (mm_mode_F_3D==mm_mode_F))
    {
      c_re=0;
    }
    if(mm_mode_F!=2)
    {
      mm_login_mode=0;
      //ch_login_status(-1);
    }
    else if(mm_mode_F_old==1)
    {
      mm_login_mode=0;
      ch_login_status(-1);
    }
    
    set_model(mm_mode_F, 0, c_re, hud.width,hud.height);
    
  }
  else
  {
    FL_cur=FL;
    set_model(mm_mode_F, 0, c_re, hud.width,hud.height);
  }
}

function ini_model()
{
  var i=0;
  for(var z=0; z<mm_qe; z++)
  {
    for(var y=0; y<mm_qe; y++)
    {
      for(var x=0; x<mm_qe; x++)
      {

        var g_obj = {id: i, x: x, y: y, z: z, 

          c_xScale: 1,
          c_yScale: 1,
          c_zScale: 1,

          d_c_xScale: 1,
          d_c_yScale: 1,
          d_c_zScale: 1,

          RotationSpeed: 0,//1/rand_10(), 
          xRotationDir: 0,//rand(-1,1),
          yRotationDir: 0,//rand(-1,1),
          zRotationDir: 0,//rand(-1,1),

          d_RotationSpeed: 0,//1/rand_10(), 
          d_xRotationDir: 0,//rand(-1,1),
          d_yRotationDir: 0,//rand(-1,1),
          d_zRotationDir: 0,//rand(-1,1),
        
          rnd_x: 0,
          rnd_y: 0,
          rnd_z: 0,

          c_x: 0,
          c_y: 0,
          c_z: 0,

          d_c_x: 0,
          d_c_y: 0,
          d_c_z: 0,

          c_Rotation: 0, 
          c_xRotationDir: 0, 
          c_yRotationDir: 0, 
          c_zRotationDir: 0,
          c_RotationF: 0,

          d_c_Rotation: 0, 
          d_c_xRotationDir: 0, 
          d_c_yRotationDir: 0, 
          d_c_zRotationDir: 0,

          Dark_K: 1,
          Pos_type_x: 0,
          Pos_type_y: 0,
          Pos_type_z: 0,

          Delay: -1,
          Phase: 0
          
        };

        g_objs.push(g_obj);
        
        i=i+1;
      }
    }
  }
}

function set_model(n_mode,sub_model, re, ww, hh)
{

  var sub_mode=sub_model;
  var qe=mm_qe;
  var k_scale=0.2+1; //mm_scale;
  var dd=0.2;
  var sh=qe*(1+dd/qe)/(qe-1);

  var sc = 1;//mm_scale * 9/(qe*(1+dd));

  var tx=0;
  var ty=0;
  var tz=0;
  
  //modelMatrix.setScale(sc*scale,sc*scale,sc*scale);

  //m_iter=-1; //iters+1;

  var www=100; 
  var hhh=50+50*hh/ww;
  var r1;//=Math.sqrt(100*100+100*hhh/www*+100*hhh/www);

  function mode_3d()
  {
    if(show_3d==0 && show_2d==1)
    {
      var ctx2d = canv2D.getContext('2d');
      ctx2d.clearRect(0, 0, canv2D.width, canv2D.height);
      canv2D.style.background = "";
    }

    show_3d=1;
    show_2d=0;

    qe=mm_qe;
    k_scale=0.2+1; //mm_scale;
    dd=0.2;
    sh=qe*(1+dd/qe)/(qe-1);

    sc = 1;//mm_scale * 9/(qe*(1+dd));

    tx=0;
    ty=0;
    tz=0;

    www=100; hhh=50+50*hh/ww;
    r1=Math.sqrt(100*100+100*hhh/www*+100*hhh/www);
    

  }

  function mode_2d()
  {
    mm_mode_F_2D=n_mode;
    show_3d=0;
    show_2d=1;

    CANVAS.height = CANVAS.height-1;
    CANVAS.height = CANVAS.height+1;
    
    redraw2D=1;
    
    
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }


  if(n_mode== -10)
  {
    mode_3d()
    var i=0;
    for(var z=0; z<mm_qe; z++)
    {
      for(var y=0; y<mm_qe; y++)
      {
        for(var x=0; x<mm_qe; x++)
        {
          g_objs[i].x= x;
          g_objs[i].y= y;
          g_objs[i].z= z;

          set_model_i(i, -1, n_mode, sub_mode, re, ww, hh);
          
          i=i+1;
        }
      }
    }
  }
  else if(n_mode==0)
  {
    mode_3d();
    if(mm_mode_F_3D!=n_mode)
    {
    initVertexBuffers_Color(gl,0);
    var i=0;
    for(var z=0; z<mm_qe; z++)
    {
      //var sh_z=(z-(qe-1)/2)*sh+k_scale*(1+dd)*(z-(qe-1)/2);
      for(var y=0; y<mm_qe; y++)
      {
        //var sh_y=(y-(qe-1)/2)*sh+k_scale*(1+dd)*(y-(qe-1)/2);
        for(var x=0; x<mm_qe; x++)
        {
          //var sh_x=(x-(qe-1)/2)*sh+k_scale*(1+dd)*(x-(qe-1)/2);
          //var g_obj = {id: i, x: x, y: y, z: z, xRotationSpeed: rand(-0.6, 0.6), yRotationSpeed: rand(-0.6, 0.6)};
          g_objs[i].x= x;
          g_objs[i].y= y;
          g_objs[i].z= z;

          set_model_i(i, -1, n_mode, sub_mode, re, ww, hh);
          
          i=i+1;
        }
      }
    }
  }
  mm_mode_F_3D=n_mode;
  }
  else if(n_mode==1)
  {
    mode_3d();
    if(mm_mode_F_3D!=n_mode)
    {
      
      initVertexBuffers_Color(gl,1);
      var i=0;
      for(var z=0; z<mm_qe; z++)
      {
        //var sh_z=(z-(qe-1)/2)*sh+k_scale*(1+dd)*(z-(qe-1)/2);
        for(var y=0; y<mm_qe; y++)
        {
          //var sh_y=(y-(qe-1)/2)*initVertexBuffers_Color(gl,1);sh+k_scale*(1+dd)*(y-(qe-1)/2);
          for(var x=0; x<mm_qe; x++)
          {
            
            g_objs[i].x= x;
            g_objs[i].y= y;
            g_objs[i].z= z;

            set_model_i(i, -1, n_mode, sub_mode, re, ww, hh);

            i=i+1;
          }
        }
      }
    }
    mm_mode_F_3D=n_mode;
  }
  else if(n_mode==2)
  {
    mode_3d();
    if(mm_mode_F_3D!=n_mode)
    {
    initVertexBuffers_Color(gl,1);
    var i=0;
    for(var z=0; z<mm_qe; z++)
    {
      //var sh_z=(z-(qe-1)/2)*sh+k_scale*(1+dd)*(z-(qe-1)/2);
      for(var y=0; y<mm_qe; y++)
      {
        //var sh_y=(y-(qe-1)/2)*initVertexBuffers_Color(gl,1);sh+k_scale*(1+dd)*(y-(qe-1)/2);
        for(var x=0; x<mm_qe; x++)
        {
          //var sh_x=(x-(qe-1)/2)*sh+k_scale*(1+dd)*(x-(qe-1)/2);
          //var g_obj = {id: i, x: x, y: y, z: z, xRotationSpeed: rand(-0.6, 0.6), yRotationSpeed: rand(-0.6, 0.6)};
          g_objs[i].x= x;
          g_objs[i].y= y;
          g_objs[i].z= z;

          set_model_i(i, -1, n_mode, sub_mode, re, ww, hh);

          i=i+1;
        }
      }
    }
  }
  mm_mode_F_3D=n_mode;
  }
  else if(n_mode==3)
  {
    mode_3d();
    if(mm_mode_F_3D!=n_mode)
    {
    initVertexBuffers_Color(gl,0);
    var i=0;
    for(var z=0; z<mm_qe; z++)
    {
      //var sh_z=(z-(qe-1)/2)*sh+k_scale*(1+dd)*(z-(qe-1)/2);
      for(var y=0; y<mm_qe; y++)
      {
        //var sh_y=(y-(qe-1)/2)*sh+k_scale*(1+dd)*(y-(qe-1)/2);
        for(var x=0; x<mm_qe; x++)
        {
          //var sh_x=(x-(qe-1)/2)*sh+k_scale*(1+dd)*(x-(qe-1)/2);
          //var g_obj = {id: i, x: x, y: y, z: z, xRotationSpeed: rand(-0.6, 0.6), yRotationSpeed: rand(-0.6, 0.6)};
          g_objs[i].x= x;
          g_objs[i].y= y;
          g_objs[i].z= z;

          set_model_i(i, -1, n_mode, sub_mode, re, ww, hh);
          
          //var g_obj = {id: i, x: x, y: y, z: z, xRotationSpeed: 1/9, yRotationSpeed: 1/9};
          /*
          g_obj.id=i;
          g_obj.x=x;
          g_obj.y=y;
          g_obj.z=z;
          g_obj.xRotationSpeed=rand(0.4, 1.6);*/
          //g_objs.push(g_obj);
          
          i=i+1;
        }
      }
    }
  }
  mm_mode_F_3D=n_mode;
  }
  else if(n_mode==4)
  {
    mode_3d();
    if(mm_mode_F_3D!=n_mode)
    {
    initVertexBuffers_Color(gl,0);
    var i=0;
    for(var z=0; z<mm_qe; z++)
    {
      //var sh_z=(z-(qe-1)/2)*sh+k_scale*(1+dd)*(z-(qe-1)/2);
      for(var y=0; y<mm_qe; y++)
      {
        //var sh_y=(y-(qe-1)/2)*sh+k_scale*(1+dd)*(y-(qe-1)/2);
        for(var x=0; x<mm_qe; x++)
        {
          //var sh_x=(x-(qe-1)/2)*sh+k_scale*(1+dd)*(x-(qe-1)/2);
          //var g_obj = {id: i, x: x, y: y, z: z, xRotationSpeed: rand(-0.6, 0.6), yRotationSpeed: rand(-0.6, 0.6)};
          g_objs[i].x= x;
          g_objs[i].y= y;
          g_objs[i].z= z;

          set_model_i(i, -1, n_mode, sub_mode, re, ww, hh);
          
          i=i+1;
        }
      }
    }
  }
  mm_mode_F_3D=n_mode;
  }
  else if(n_mode==5)
  {
    mode_2d();

    if(gr_data1_111.length==0)
    {
      parse_g_data_2D();
    }
    DGRM_prepare();
    canv2D.style.background = "#022140";

    g_mode1_111=2;
    g_mode4_141=1;

    last_img_111=[];
    last_img_111[0] = {data: -1};
    last_img_141=[];
    last_img_141[0] = {data: -1};
    last_img_141[1] = {data: -2};
    last_img_141[2] = {data: -3};
    last_img_141[3] = {data: -4};
    last_img_131=[];
    last_img_131[0] = {data: -1};
    last_img_131[1] = {data: -2};
    last_img_131[2] = {data: -3};

    disp_all_elem(/*ev,msg,canv,full*/);
    /*
    draw_graph_data(1,2);
    draw_graph_data_141(2);
    draw_graph_data_131(3,1);//,g_mode3_131);
    draw_graph_data_141(4);
    */
  }




function set_model_i(i,iters,n_mode, sub_mode, re, ww, hh)
{

  if(n_mode== -10)
  {


          g_objs[i].c_xScale= 1;
          g_objs[i].c_yScale= 1;
          g_objs[i].c_zScale= 1;

          g_objs[i].RotationSpeed= 1/rand_10(); 
          g_objs[i].xRotationDir= rand(-1,1);
          g_objs[i].yRotationDir= rand(-1,1);
          g_objs[i].zRotationDir= rand(-1,1);
          
          g_objs[i].c_x= 0;
          g_objs[i].c_y= 0;
          g_objs[i].c_z= 0;

          g_objs[i].c_Rotation= 0; 
          g_objs[i].c_xRotationDir= 0; 
          g_objs[i].c_yRotationDir= 0; 
          g_objs[i].c_zRotationDir= 0; 
          g_objs[i].c_RotationF= 0;

          g_objs[i].Dark_K= 1;
          g_objs[i].Pos_type_x=0;
          g_objs[i].Pos_type_y=0;
          g_objs[i].Pos_type_z=0;

          
  }
  if(n_mode==0)
  {


          var c_xScale= 1; //rand(4.0, 4.6);
          var c_yScale= 1; //rand(4.0, 4.6);
          var c_zScale= 1; //rand(4.0, 4.6);

          g_objs[i].d_c_xScale=(c_xScale-g_objs[i].c_xScale)/iters;
          g_objs[i].c_xScale=c_xScale;
          g_objs[i].d_c_yScale=(c_yScale-g_objs[i].c_yScale)/iters;
          g_objs[i].c_yScale= c_yScale;
          g_objs[i].d_c_zScale=(c_zScale-g_objs[i].c_zScale)/iters;
          g_objs[i].c_zScale= c_zScale;

          var RotationSpeed= 0; 
          var xRotationDir= 0;
          var yRotationDir= 0;
          var zRotationDir= 0;

          g_objs[i].d_RotationSpeed=(RotationSpeed-g_objs[i].RotationSpeed)/iters;
          g_objs[i].d_xRotationDir= (xRotationDir -g_objs[i].xRotationDir)/iters;
          g_objs[i].d_yRotationDir= (yRotationDir -g_objs[i].yRotationDir)/iters;
          g_objs[i].d_zRotationDir= (zRotationDir -g_objs[i].zRotationDir)/iters;

          g_objs[i].RotationSpeed=RotationSpeed; 
          g_objs[i].xRotationDir= xRotationDir;
          g_objs[i].yRotationDir= yRotationDir;
          g_objs[i].zRotationDir= zRotationDir;

          var c_x= 0;
          var c_y= 0;
          var c_z= 0;
          
          g_objs[i].d_c_x=(c_x-g_objs[i].c_x)/iters;
          g_objs[i].c_x=c_x;
          g_objs[i].d_c_y=(c_y-g_objs[i].c_y)/iters;
          g_objs[i].c_y= c_y;
          g_objs[i].d_c_z=(c_z-g_objs[i].c_z)/iters;
          g_objs[i].c_z= c_z;



          g_objs[i].c_RotationF= 0;

          var c_Rotation= 0; 
          var c_xRotationDir= 0;
          var c_yRotationDir= 0;
          var c_zRotationDir= 0;

          g_objs[i].d_c_Rotation=(c_Rotation-g_objs[i].c_Rotation)/iters;
          g_objs[i].d_c_xRotationDir= (c_xRotationDir -g_objs[i].c_xRotationDir)/iters;
          g_objs[i].d_c_yRotationDir= (c_yRotationDir -g_objs[i].c_yRotationDir)/iters;
          g_objs[i].d_c_zRotationDir= (c_zRotationDir -g_objs[i].c_zRotationDir)/iters;

          g_objs[i].c_Rotation=c_Rotation; 
          g_objs[i].c_xRotationDir= c_xRotationDir;
          g_objs[i].c_yRotationDir= c_yRotationDir;
          g_objs[i].c_zRotationDir= c_zRotationDir;

          g_objs[i].cust_colors= []; 
          g_objs[i].cust_color= [0.5, 0.5, 0.5, 0.0];
          g_objs[i].cust_colorm= [0.5, 0.5, 0.5, 0.0];

          g_objs[i].Dark_K= 1;
          g_objs[i].Pos_type_x=0;
          g_objs[i].Pos_type_y=0;
          g_objs[i].Pos_type_z=0;

          g_objs[i].Delay=-1;
          g_objs[i].Phase=0;
          

  }
  else if(n_mode==1)
  {

          var c_xScale= 4; //rand(4.0, 4.6);
          var c_yScale= 4; //rand(4.0, 4.6);
          var c_zScale= 4; //rand(4.0, 4.6);

          g_objs[i].d_c_xScale=(c_xScale-g_objs[i].c_xScale)/iters;
          g_objs[i].c_xScale=c_xScale;
          g_objs[i].d_c_yScale=(c_yScale-g_objs[i].c_yScale)/iters;
          g_objs[i].c_yScale= c_yScale;
          g_objs[i].d_c_zScale=(c_zScale-g_objs[i].c_zScale)/iters;
          g_objs[i].c_zScale= c_zScale;


          var RotationSpeed= 0; 
          var xRotationDir= 0;
          var yRotationDir= 0;
          var zRotationDir= 0;

          g_objs[i].d_RotationSpeed=(RotationSpeed-g_objs[i].RotationSpeed)/iters;
          g_objs[i].d_xRotationDir= (xRotationDir -g_objs[i].xRotationDir)/iters;
          g_objs[i].d_yRotationDir= (yRotationDir -g_objs[i].yRotationDir)/iters;
          g_objs[i].d_zRotationDir= (zRotationDir -g_objs[i].zRotationDir)/iters;

          g_objs[i].RotationSpeed=RotationSpeed; 
          g_objs[i].xRotationDir= xRotationDir;
          g_objs[i].yRotationDir= yRotationDir;
          g_objs[i].zRotationDir= zRotationDir;
          
          var c_x= 0;
          var c_y= 0;
          var c_z= 0;
          if(re==1)
          {
            c_x=rand(-100, 100);
            c_y=rand(-100*hhh/www, 100*hhh/www);
            //c_y= rand(-60, 60);
            g_objs[i].rnd_x=c_x;
            g_objs[i].rnd_y=c_y;
          }
          else
          {
            if(mm_mode_F_old==2)
            {
              c_x=g_objs[i].rnd_x;
              c_y=g_objs[i].rnd_y;// *60/Math.abs(100*hhh/www);
            }
            else
            {
              c_x=g_objs[i].rnd_x;
              c_y=g_objs[i].rnd_y;
            }
          }

          c_z= 0.002*(c_x*c_x+c_y*c_y);

          g_objs[i].d_c_x=(c_x-g_objs[i].c_x)/iters;
          g_objs[i].c_x=c_x;
          g_objs[i].d_c_y=(c_y-g_objs[i].c_y)/iters;
          g_objs[i].c_y= c_y;

          g_objs[i].d_c_z=(c_z-g_objs[i].c_z)/iters;
          g_objs[i].c_z= c_z;

          g_objs[i].c_RotationF= 0.001;

          var c_Rotation= rand_N(4)/5; //rand(0, 1); 
          var c_xRotationDir= rand(-1, 1); 
          var c_yRotationDir= rand(-1, 1); 
          var c_zRotationDir= 0;//-1 + rand_N(2);//rand(-1, 1); 

          g_objs[i].d_c_Rotation=(c_Rotation-g_objs[i].c_Rotation)/iters;
          g_objs[i].d_c_xRotationDir= (c_xRotationDir -g_objs[i].c_xRotationDir)/iters;
          g_objs[i].d_c_yRotationDir= (c_yRotationDir -g_objs[i].c_yRotationDir)/iters;
          g_objs[i].d_c_zRotationDir= (c_zRotationDir -g_objs[i].c_zRotationDir)/iters;

          g_objs[i].c_Rotation=c_Rotation; 
          g_objs[i].c_xRotationDir= c_xRotationDir;
          g_objs[i].c_yRotationDir= c_yRotationDir;
          g_objs[i].c_zRotationDir= c_zRotationDir;

          g_objs[i].cust_colors= []; 
          //g_objs[i].cust_color= [0.5, 0.5, 0.5, 0.0];
          //g_objs[i].cust_colorm= [];

          g_objs[i].cust_color= [0.2, 0.9, 0.9, 1.0];
          g_objs[i].cust_colorm= [rand(0,1), rand(0,1), rand(0,1), 1];

          g_objs[i].Dark_K= 1;
          g_objs[i].Pos_type_x=0;
          g_objs[i].Pos_type_y=0;
          g_objs[i].Pos_type_z=0;
          
          g_objs[i].Delay=-1;
          g_objs[i].Phase=0;
          
          
  }
  else if(n_mode==2)
  {

          var c_xScale= 4; //rand(4.0, 4.6);
          var c_yScale= 4; //rand(4.0, 4.6);
          var c_zScale= 4; //rand(4.0, 4.6);

          g_objs[i].d_c_xScale=(c_xScale-g_objs[i].c_xScale)/iters;
          g_objs[i].c_xScale=c_xScale;

          g_objs[i].d_c_yScale=(c_yScale-g_objs[i].c_yScale)/iters;
          g_objs[i].c_yScale= c_yScale;

          g_objs[i].d_c_zScale=(c_zScale-g_objs[i].c_zScale)/iters;
          g_objs[i].c_zScale= c_zScale;

          var RotationSpeed= 0; 
          var xRotationDir= 0;
          var yRotationDir= 0;
          var zRotationDir= 0;

          g_objs[i].d_RotationSpeed=(RotationSpeed-g_objs[i].RotationSpeed)/iters;
          g_objs[i].d_xRotationDir= (xRotationDir -g_objs[i].xRotationDir)/iters;
          g_objs[i].d_yRotationDir= (yRotationDir -g_objs[i].yRotationDir)/iters;
          g_objs[i].d_zRotationDir= (zRotationDir -g_objs[i].zRotationDir)/iters;

          g_objs[i].RotationSpeed=RotationSpeed; 
          g_objs[i].xRotationDir= xRotationDir;
          g_objs[i].yRotationDir= yRotationDir;
          g_objs[i].zRotationDir= zRotationDir;
          

          if(re==1)
          {
            tx=rand(-100, 100);
            ty=rand(-100*hhh/www, 100*hhh/www);
            g_objs[i].rnd_x=tx;
            g_objs[i].rnd_y=ty;
          }
          else
          {
            if(mm_mode_F_old==1)
            {
              tx=g_objs[i].rnd_x;
              ty=g_objs[i].rnd_y;// *Math.abs(100*hhh/www)/60;
            }
            else
            {
              tx=g_objs[i].rnd_x;
              ty=g_objs[i].rnd_y;
            }
          }


          var r0=100;
          var r1=130;
          var r=Math.sqrt(tx*tx+ty*ty);
          var tk=1; //tx/ty;

          var a=0;
          if(r<r0)
          {
            /*
            tk=(r0-r+r0)/r;
            tx=tk * tx;
            ty=tk * ty;

            r=Math.sqrt(tx*tx+ty*ty);
            */
            //a=-100;

            tk=r0/r;

            //r=Math.sqrt(tx*tx+ty*ty);
          }
          /*
          g_objs[i].c_x= tx;
          g_objs[i].c_y= ty;
          //g_objs[i].c_z= -((r1-r)*(r1-r))/100;// rand(-1, 1);
          g_objs[i].c_z= -((r1-r));// rand(-1, 1);
          */
          
          var c_x= tx;
          var c_y= ty;

          var c_z= -((r1-r))*tk+40;

          g_objs[i].d_c_x=(c_x-g_objs[i].c_x)/iters;
          g_objs[i].c_x=c_x;

          g_objs[i].d_c_y=(c_y-g_objs[i].c_y)/iters;
          g_objs[i].c_y= c_y;

          g_objs[i].d_c_z=(c_z-g_objs[i].c_z)/iters;
          g_objs[i].c_z= c_z;

          g_objs[i].c_RotationF= 0.001;

          var c_Rotation= rand_N(4)/5 +0.4; //rand(0, 1); 
          var c_xRotationDir= rand(-1, 1); 
          var c_yRotationDir= rand(-1, 1); 
          var c_zRotationDir= -1;//-1 + rand_N(2);//rand(-1, 1); 

          g_objs[i].d_c_Rotation=(c_Rotation-g_objs[i].c_Rotation)/iters;
          g_objs[i].d_c_xRotationDir= (c_xRotationDir -g_objs[i].c_xRotationDir)/iters;
          g_objs[i].d_c_yRotationDir= (c_yRotationDir -g_objs[i].c_yRotationDir)/iters;
          g_objs[i].d_c_zRotationDir= (c_zRotationDir -g_objs[i].c_zRotationDir)/iters;

          g_objs[i].c_Rotation=c_Rotation; 
          g_objs[i].c_xRotationDir= c_xRotationDir;
          g_objs[i].c_yRotationDir= c_yRotationDir;
          g_objs[i].c_zRotationDir= c_zRotationDir;

          g_objs[i].cust_colors= []; 
          //g_objs[i].cust_color= [0.5, 0.5, 0.5, 0.0];
          //g_objs[i].cust_colorm= [];

          g_objs[i].cust_color= [0.2, 0.9, 0.9, 1.0];
          g_objs[i].cust_colorm= [rand(0,1), rand(0,1), rand(0,1), 1];

          g_objs[i].Dark_K= 1;
          g_objs[i].Pos_type_x=0;
          g_objs[i].Pos_type_y=0;
          g_objs[i].Pos_type_z=0;
          
          g_objs[i].Delay=-1;
          g_objs[i].Phase=0;
          
          //var g_obj = {id: i, x: x, y: y, z: z, xRotationSpeed: 1/9, yRotationSpeed: 1/9};
          /*
          g_obj.id=i;
          g_obj.x=x;
          g_obj.y=y;
          g_obj.z=z;
          g_obj.xRotationSpeed=rand(0.4, 1.6);*/
          //g_objs.push(g_obj);
        
  }
  else if(n_mode==3)
  {

          //var sh_x=(x-(qe-1)/2)*sh+k_scale*(1+dd)*(x-(qe-1)/2);
          //var g_obj = {id: i, x: x, y: y, z: z, xRotationSpeed: rand(-0.6, 0.6), yRotationSpeed: rand(-0.6, 0.6)};

          var k_c_xyz=1;

          var big_sh_v=50;
          var big_sh_v1=-10;
          var big_sh_x=0;
          var big_sh_y=0;
          var big_sh_z=0;

          var c_xScale= sc; //rand(4.0, 4.6);
          var c_yScale= sc; //rand(4.0, 4.6);
          var c_zScale= sc; //rand(4.0, 4.6);

          var x=g_objs[i].x;
          var y=g_objs[i].y;
          var z=g_objs[i].z;

          g_objs[i].Delay=-1;
          g_objs[i].Phase=0;

          if(sub_model==1 && glob__P>=0 && glob__P_id>=0)
          {
            //big_sh_x=big_sh_v1;
            //big_sh_y=big_sh_v1;
            //big_sh_z=big_sh_v1;


            if(glob__P==0)
            {
              if(y != g_objs[glob__P_id].y && z != g_objs[glob__P_id].z)
              {
                big_sh_x=  big_sh_v;
              }
              else
              {
                big_sh_x=  big_sh_v1;
                g_objs[i].Phase=1;
              }
            }
            else if(glob__P==1)
            {
              if(y != g_objs[glob__P_id].y && z != g_objs[glob__P_id].z)
              {
                big_sh_x= -big_sh_v;
              }
              else
              {
                big_sh_x= -big_sh_v1;
                g_objs[i].Phase=1;
              }
            }

            if(glob__P==2)
            {
              if(x != g_objs[glob__P_id].x && z != g_objs[glob__P_id].z)
              {
                big_sh_y=  big_sh_v;
              }
              else
              {
                big_sh_y=  big_sh_v1;
                g_objs[i].Phase=1;
              }
            }
            else if(glob__P==3)
            {
              if(x != g_objs[glob__P_id].x && z != g_objs[glob__P_id].z)
              {
                big_sh_y= -big_sh_v;
              }
              else
              {
                big_sh_y= -big_sh_v1;
                g_objs[i].Phase=1;
              }
            }

            if(glob__P==4)
            {
              if(x != g_objs[glob__P_id].x && y != g_objs[glob__P_id].y)
              {
                big_sh_z=  big_sh_v;
              }
              else
              {
                big_sh_z=  big_sh_v1;
                g_objs[i].Phase=1;
              }
            }
            else if(glob__P==5)
            {
              if(x != g_objs[glob__P_id].x && y != g_objs[glob__P_id].y)
              {
                big_sh_z= -big_sh_v;
              }
              else
              {
                big_sh_z= -big_sh_v1;
                g_objs[i].Phase=1;
              }
            }

          }
          else if(sub_model==2 && glob__P>=0 && glob__P_id>=0)
          {
            if(glob__P==6)
            {
              if(x != g_objs[glob__P_id].x || y != g_objs[glob__P_id].y || z != g_objs[glob__P_id].z)
              {
                var big_sh_R= rand(400,3000);
                var kxy=0.2;
                var ksd=0.1;
                
                if(glob__P_old==0)
                {
                  big_sh_x= big_sh_R;
                  g_objs[i].Delay=(-1+((mm_qe-y-1)+kxy*(mm_qe-x-1))/(mm_qe*(1+kxy)))*(1-ksd)-ksd;
                }
                else if(glob__P_old==1)
                {
                  big_sh_x= -big_sh_R;
                  g_objs[i].Delay=(-1+((mm_qe-y-1)+kxy*(x))/(mm_qe*(1+kxy)))*(1-ksd)-ksd;
                }
                else if(glob__P_old==2)
                {
                  big_sh_y= big_sh_R;
                  g_objs[i].Delay=(-1+((mm_qe-z-1)+kxy*(mm_qe-y-1))/(mm_qe*(1+kxy)))*(1-ksd)-ksd;
                }
                else if(glob__P_old==3)
                {
                  big_sh_y= -big_sh_R;
                  g_objs[i].Delay=(-1+((mm_qe-z-1)+kxy*(y))/(mm_qe*(1+kxy)))*(1-ksd)-ksd;
                }
                else if(glob__P_old==4)
                {
                  big_sh_z= big_sh_R;
                  g_objs[i].Delay=(-1+((mm_qe-y-1)+kxy*(mm_qe-z-1))/(mm_qe*(1+kxy)))*(1-ksd)-ksd;
                }
                else if(glob__P_old==5)
                {
                  big_sh_z= -big_sh_R;
                  g_objs[i].Delay=(-1+((mm_qe-y-1)+kxy*(z))/(mm_qe*(1+kxy)))*(1-ksd)-ksd;
                }
                /*
                big_sh_x= (1-2*Math.round(rand(0,1)))*rand(0.1,2)* big_sh_R;
                big_sh_y= (1-2*Math.round(rand(0,1)))*rand(0.1,2)* big_sh_R;
                big_sh_z= (1-2*Math.round(rand(0,1)))*rand(0.1,2)* big_sh_R;
                */

                //big_sh_x=  (1-2*Math.round(rand(0,1)))*rand(60,80);
                //big_sh_y=  (1-2*Math.round(rand(0,1)))*rand(60,80);
                //big_sh_z=  (1-2*Math.round(rand(0,1)))*rand(60,80);

                c_xScale=0.2;
                c_yScale=0.2;
                c_zScale=0.2;
              }
              else
              {
                c_xScale=c_xScale*6;
                c_yScale=c_yScale*6;
                c_zScale=c_zScale*6;
                k_c_xyz=0;
                g_objs[i].Phase=2;
              }

            }
          }


          g_objs[i].d_c_xScale=(c_xScale-g_objs[i].c_xScale)/iters;
          g_objs[i].c_xScale=c_xScale;

          g_objs[i].d_c_yScale=(c_yScale-g_objs[i].c_yScale)/iters;
          g_objs[i].c_yScale= c_yScale;

          g_objs[i].d_c_zScale=(c_zScale-g_objs[i].c_zScale)/iters;
          g_objs[i].c_zScale= c_zScale;

          var RotationSpeed= 0; 
          var xRotationDir= 0;
          var yRotationDir= 0;
          var zRotationDir= 0;

          g_objs[i].d_RotationSpeed=(RotationSpeed-g_objs[i].RotationSpeed)/iters;
          g_objs[i].d_xRotationDir= (xRotationDir -g_objs[i].xRotationDir)/iters;
          g_objs[i].d_yRotationDir= (yRotationDir -g_objs[i].yRotationDir)/iters;
          g_objs[i].d_zRotationDir= (zRotationDir -g_objs[i].zRotationDir)/iters;

          g_objs[i].RotationSpeed=RotationSpeed; 
          g_objs[i].xRotationDir= xRotationDir;
          g_objs[i].yRotationDir= yRotationDir;
          g_objs[i].zRotationDir= zRotationDir;

          
          var c_x= k_c_xyz*((x-(qe-1)/2)*sh+k_scale*(1+dd)*(x-(qe-1)/2)) + big_sh_x;
          var c_y= k_c_xyz*((y-(qe-1)/2)*sh+k_scale*(1+dd)*(y-(qe-1)/2)) + big_sh_y;
          var c_z= k_c_xyz*((z-(qe-1)/2)*sh+k_scale*(1+dd)*(z-(qe-1)/2)) + big_sh_z;

          g_objs[i].d_c_x=(c_x-g_objs[i].c_x)/iters;
          g_objs[i].c_x=c_x;

          g_objs[i].d_c_y=(c_y-g_objs[i].c_y)/iters;
          g_objs[i].c_y= c_y;

          g_objs[i].d_c_z=(c_z-g_objs[i].c_z)/iters;
          g_objs[i].c_z= c_z;

          g_objs[i].c_RotationF= 0;

          var c_Rotation= 0; 
          var c_xRotationDir= 0;
          var c_yRotationDir= 0;
          var c_zRotationDir= 0;

          g_objs[i].d_c_Rotation=(c_Rotation-g_objs[i].c_Rotation)/iters;
          g_objs[i].d_c_xRotationDir= (c_xRotationDir -g_objs[i].c_xRotationDir)/iters;
          g_objs[i].d_c_yRotationDir= (c_yRotationDir -g_objs[i].c_yRotationDir)/iters;
          g_objs[i].d_c_zRotationDir= (c_zRotationDir -g_objs[i].c_zRotationDir)/iters;

          g_objs[i].c_Rotation=c_Rotation; 
          g_objs[i].c_xRotationDir= c_xRotationDir;
          g_objs[i].c_yRotationDir= c_yRotationDir;
          g_objs[i].c_zRotationDir= c_zRotationDir;

          g_objs[i].cust_colors= []; 
          g_objs[i].cust_color= [0.5, 0.5, 0.5, 0.0];
          g_objs[i].cust_colorm= [0.5, 0.5, 0.5, 0.0];

          //g_objs[i].Dark_K= 0.3;
          //g_objs[i].Pos_type_x=0;
          //g_objs[i].Pos_type_y=0;
          //g_objs[i].Pos_type_z=0;

          /*
          if(g_objs[i].Phase==3)
          {
            g_objs[i].Dark_K= 0.5;
            g_objs[i].Pos_type_x= 1;
            g_objs[i].Pos_type_y= 1;
            g_objs[i].Pos_type_z= 1;
          }
          else 
          */
          if(g_objs[i].x==0 || g_objs[i].x==mm_qe-1 || g_objs[i].y==0 || g_objs[i].y==mm_qe-1 || g_objs[i].z==0 || g_objs[i].z==mm_qe-1)
          {
            g_objs[i].Dark_K= 0.5;

            if(g_objs[i].x==0)
            {
              g_objs[i].Pos_type_x= 1;
            }
            else if(g_objs[i].x==mm_qe-1)
            {
              g_objs[i].Pos_type_x=-1;
            }
            if(g_objs[i].y==0)
            {
              g_objs[i].Pos_type_y=-1;
            }
            else if(g_objs[i].y==mm_qe-1)
            {
              g_objs[i].Pos_type_y= 1;
            }
            if(g_objs[i].z==0)
            {
              g_objs[i].Pos_type_z= 1;
            }
            else if(g_objs[i].z==mm_qe-1)
            {
              g_objs[i].Pos_type_z=-1;
            }
          }
          else
          {
            g_objs[i].Dark_K= 0.4;
            g_objs[i].Pos_type_x=0;
            g_objs[i].Pos_type_y=0;
            g_objs[i].Pos_type_z=0;
          }
          


          //var g_obj = {id: i, x: x, y: y, z: z, xRotationSpeed: 1/9, yRotationSpeed: 1/9};
          /*
          g_obj.id=i;
          g_obj.x=x;
          g_obj.y=y;
          g_obj.z=z;
          g_obj.xRotationSpeed=rand(0.4, 1.6);*/
          //g_objs.push(g_obj);
          
  }
  else if(n_mode==4)
  {

          //var sh_x=(x-(qe-1)/2)*sh+k_scale*(1+dd)*(x-(qe-1)/2);
          //var g_obj = {id: i, x: x, y: y, z: z, xRotationSpeed: rand(-0.6, 0.6), yRotationSpeed: rand(-0.6, 0.6)};

          var k_c_xyz=1;

          var big_sh_v=50;
          var big_sh_v1=-10;
          var big_sh_x=0;
          var big_sh_y=0;
          var big_sh_z=0;

          var c_xScale= sc; //rand(4.0, 4.6);
          var c_yScale= sc; //rand(4.0, 4.6);
          var c_zScale= sc; //rand(4.0, 4.6);

          var x=g_objs[i].x;
          var y=g_objs[i].y;
          var z=g_objs[i].z;

          g_objs[i].Delay=-1;
          g_objs[i].Phase=0;

          if(sub_model==1 && glob__P>=0 && glob__P_id>=0)
          {
            //big_sh_x=big_sh_v1;
            //big_sh_y=big_sh_v1;
            //big_sh_z=big_sh_v1;


            if(glob__P==0)
            {
              if(y != g_objs[glob__P_id].y && z != g_objs[glob__P_id].z)
              {
                big_sh_x=  big_sh_v;
              }
              else
              {
                big_sh_x=  big_sh_v1;
                g_objs[i].Phase=1;
              }
            }
            else if(glob__P==1)
            {
              if(y != g_objs[glob__P_id].y && z != g_objs[glob__P_id].z)
              {
                big_sh_x= -big_sh_v;
              }
              else
              {
                big_sh_x= -big_sh_v1;
                g_objs[i].Phase=1;
              }
            }

            if(glob__P==2)
            {
              if(x != g_objs[glob__P_id].x && z != g_objs[glob__P_id].z)
              {
                big_sh_y=  big_sh_v;
              }
              else
              {
                big_sh_y=  big_sh_v1;
                g_objs[i].Phase=1;
              }
            }
            else if(glob__P==3)
            {
              if(x != g_objs[glob__P_id].x && z != g_objs[glob__P_id].z)
              {
                big_sh_y= -big_sh_v;
              }
              else
              {
                big_sh_y= -big_sh_v1;
                g_objs[i].Phase=1;
              }
            }

            if(glob__P==4)
            {
              if(x != g_objs[glob__P_id].x && y != g_objs[glob__P_id].y)
              {
                big_sh_z=  big_sh_v;
              }
              else
              {
                big_sh_z=  big_sh_v1;
                g_objs[i].Phase=1;
              }
            }
            else if(glob__P==5)
            {
              if(x != g_objs[glob__P_id].x && y != g_objs[glob__P_id].y)
              {
                big_sh_z= -big_sh_v;
              }
              else
              {
                big_sh_z= -big_sh_v1;
                g_objs[i].Phase=1;
              }
            }

          }
          else if(sub_model==2 && glob__P>=0 && glob__P_id>=0)
          {
            if(glob__P==6)
            {
              if(x != g_objs[glob__P_id].x || y != g_objs[glob__P_id].y || z != g_objs[glob__P_id].z)
              {
                var big_sh_R= rand(400,3000);
                var kxy=0.2;
                var ksd=0.1;
                
                if(glob__P_old==0)
                {
                  big_sh_x= big_sh_R;
                  g_objs[i].Delay=(-1+((mm_qe-y-1)+kxy*(mm_qe-x-1))/(mm_qe*(1+kxy)))*(1-ksd)-ksd;
                }
                else if(glob__P_old==1)
                {
                  big_sh_x= -big_sh_R;
                  g_objs[i].Delay=(-1+((mm_qe-y-1)+kxy*(x))/(mm_qe*(1+kxy)))*(1-ksd)-ksd;
                }
                else if(glob__P_old==2)
                {
                  big_sh_y= big_sh_R;
                  g_objs[i].Delay=(-1+((mm_qe-z-1)+kxy*(mm_qe-y-1))/(mm_qe*(1+kxy)))*(1-ksd)-ksd;
                }
                else if(glob__P_old==3)
                {
                  big_sh_y= -big_sh_R;
                  g_objs[i].Delay=(-1+((mm_qe-z-1)+kxy*(y))/(mm_qe*(1+kxy)))*(1-ksd)-ksd;
                }
                else if(glob__P_old==4)
                {
                  big_sh_z= big_sh_R;
                  g_objs[i].Delay=(-1+((mm_qe-y-1)+kxy*(mm_qe-z-1))/(mm_qe*(1+kxy)))*(1-ksd)-ksd;
                }
                else if(glob__P_old==5)
                {
                  big_sh_z= -big_sh_R;
                  g_objs[i].Delay=(-1+((mm_qe-y-1)+kxy*(z))/(mm_qe*(1+kxy)))*(1-ksd)-ksd;
                }
                /*
                big_sh_x= (1-2*Math.round(rand(0,1)))*rand(0.1,2)* big_sh_R;
                big_sh_y= (1-2*Math.round(rand(0,1)))*rand(0.1,2)* big_sh_R;
                big_sh_z= (1-2*Math.round(rand(0,1)))*rand(0.1,2)* big_sh_R;
                */

                //big_sh_x=  (1-2*Math.round(rand(0,1)))*rand(60,80);
                //big_sh_y=  (1-2*Math.round(rand(0,1)))*rand(60,80);
                //big_sh_z=  (1-2*Math.round(rand(0,1)))*rand(60,80);

                c_xScale=0.2;
                c_yScale=0.2;
                c_zScale=0.2;
              }
              else
              {
                c_xScale=c_xScale*6;
                c_yScale=c_yScale*6;
                c_zScale=c_zScale*6;
                k_c_xyz=0;
                g_objs[i].Phase=2;
              }

            }
          }

          g_objs[i].d_c_xScale=(c_xScale-g_objs[i].c_xScale)/iters;
          g_objs[i].c_xScale=c_xScale;

          g_objs[i].d_c_yScale=(c_yScale-g_objs[i].c_yScale)/iters;
          g_objs[i].c_yScale= c_yScale;

          g_objs[i].d_c_zScale=(c_zScale-g_objs[i].c_zScale)/iters;
          g_objs[i].c_zScale= c_zScale;

          var RotationSpeed= 0; 
          var xRotationDir= 0;
          var yRotationDir= 0;
          var zRotationDir= 0;

          g_objs[i].d_RotationSpeed=(RotationSpeed-g_objs[i].RotationSpeed)/iters;
          g_objs[i].d_xRotationDir= (xRotationDir -g_objs[i].xRotationDir)/iters;
          g_objs[i].d_yRotationDir= (yRotationDir -g_objs[i].yRotationDir)/iters;
          g_objs[i].d_zRotationDir= (zRotationDir -g_objs[i].zRotationDir)/iters;

          g_objs[i].RotationSpeed=RotationSpeed; 
          g_objs[i].xRotationDir= xRotationDir;
          g_objs[i].yRotationDir= yRotationDir;
          g_objs[i].zRotationDir= zRotationDir;

          
          var c_x= k_c_xyz*((x-(qe-1)/2)*sh+k_scale*(1+dd)*(x-(qe-1)/2)) + big_sh_x;
          var c_y= k_c_xyz*((y-(qe-1)/2)*sh+k_scale*(1+dd)*(y-(qe-1)/2)) + big_sh_y;
          var c_z= k_c_xyz*((z-(qe-1)/2)*sh+k_scale*(1+dd)*(z-(qe-1)/2)) + big_sh_z;

          g_objs[i].d_c_x=(c_x-g_objs[i].c_x)/iters;
          g_objs[i].c_x=c_x;

          g_objs[i].d_c_y=(c_y-g_objs[i].c_y)/iters;
          g_objs[i].c_y= c_y;

          g_objs[i].d_c_z=(c_z-g_objs[i].c_z)/iters;
          g_objs[i].c_z= c_z;

          g_objs[i].c_RotationF= 0;

          var c_Rotation= 0; 
          var c_xRotationDir= 0;
          var c_yRotationDir= 0;
          var c_zRotationDir= 0;

          g_objs[i].d_c_Rotation=(c_Rotation-g_objs[i].c_Rotation)/iters;
          g_objs[i].d_c_xRotationDir= (c_xRotationDir -g_objs[i].c_xRotationDir)/iters;
          g_objs[i].d_c_yRotationDir= (c_yRotationDir -g_objs[i].c_yRotationDir)/iters;
          g_objs[i].d_c_zRotationDir= (c_zRotationDir -g_objs[i].c_zRotationDir)/iters;

          g_objs[i].c_Rotation=c_Rotation; 
          g_objs[i].c_xRotationDir= c_xRotationDir;
          g_objs[i].c_yRotationDir= c_yRotationDir;
          g_objs[i].c_zRotationDir= c_zRotationDir;


          g_objs[i].cust_colors= [0.4, 0.4, 1.0,  0.4, 1.0, 0.4,  1.0, 0.4, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 1.0,  0.4, 1.0, 1.0];
          g_objs[i].cust_color= [0.9, 0.9, 0.9, 1.0];
          g_objs[i].cust_colorm= [rand(0,1), rand(0,1), rand(0,1), 1];

          if(g_objs[i].x==0 || g_objs[i].x==mm_qe-1 || g_objs[i].y==0 || g_objs[i].y==mm_qe-1 || g_objs[i].z==0 || g_objs[i].z==mm_qe-1)
          {
            g_objs[i].Dark_K= 0.5;
            if(g_objs[i].x==0)
            {
              g_objs[i].Pos_type_x= 1;
            }
            else if(g_objs[i].x==mm_qe-1)
            {
              g_objs[i].Pos_type_x=-1;
            }
            if(g_objs[i].y==0)
            {
              g_objs[i].Pos_type_y=-1;
            }
            else if(g_objs[i].y==mm_qe-1)
            {
              g_objs[i].Pos_type_y= 1;
            }
            if(g_objs[i].z==0)
            {
              g_objs[i].Pos_type_z= 1;
            }
            else if(g_objs[i].z==mm_qe-1)
            {
              g_objs[i].Pos_type_z=-1;
            }
          }
          else
          {
            g_objs[i].Dark_K= 0.4;
            g_objs[i].Pos_type_x=0;
            g_objs[i].Pos_type_y=0;
            g_objs[i].Pos_type_z=0;
          }

          
  }
  
}

}




window.onload=Fog_01.main();
