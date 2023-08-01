
function DGRM_prepare()
{
  n_main_DGRM=-1;
  DGRM_params=[];
  var DGRM_param1={Z:0.5, A:0.0, B:0.0, on: 0};
  DGRM_params.push(DGRM_param1);
  var DGRM_param2={Z:0.5, A:0.5, B:0.0, on: 0};
  DGRM_params.push(DGRM_param2);
  var DGRM_param3={Z:0.5, A:0.0, B:0.5, on: 0};
  DGRM_params.push(DGRM_param3);
  var DGRM_param4={Z:0.5, A:0.5, B:0.5, on: 0};
  DGRM_params.push(DGRM_param4);
}

function parse_g_data_2D()
{
    //let rr=eval("("+x_responseText+")");
    //gr_data1_111=generate_data_01();
    //gr_data2_111=form_gr_data1(rr.t2);
    var rr111_t1={
      p  :[1,2,2,2,2,2,2,2,2,2,2,2,2],
      x1 :['A','2022-04','2022-05','2022-06','2022-07','2022-08','2022-09','2022-10','2022-11','2022-12','2023-01','2023-02','2023-03'],
      y1 :[1,400,450,420,360,340,340,440,521,470,390,395,410],
      y1m:[1,521],
      y2 :[1,180,210,230,240,290,280,230,380,360,210,240,310],
      y2m:[1,380]};
    gr_data1_111=form_gr_data1(rr111_t1);

    ///////////////////////////////////////////////////////////////////////// - 1
    var rr141_t2={
      p  :[1,1,1,1,1],
      x1 :['Возврат','Восст.рез.','Проценты','Пени','ДРУГИЕ'],
      y1 :[400,200,50,10,340],
      y1m:[1000,1000,1000,1000,1000]};
    gr_data2_141=form_gr_data2(rr141_t2); //rr.t2);
    //gr_data2_141=generate_data_01_141_2();


    gr_data1p_111={px1: [], px2: [], py1: [], py2: [], pys: []};
    //gr_data2p_111={px1: [], px2: [], py1: [], py2: [], pys: []};

    
    ///////////////////////////////////////////////////////////////////////// - 2
    //gr_data1p_141=[];
    gr_data2p_141=[];
    //gr_data3p_141=[];
    //gr_data4p_141=[];
    //gr_data1p_141[0]={px1: [], px2: [], py1: [], py2: [], pys: []};
    gr_data2p_141[0]={pcx: 0, pcy: 0, r1: 0, r2: 0, data_c1: [], data_c2: [], data_l_x1: [], data_l_y1: [], data_l_x2: [], data_l_y2: []};
    //gr_data3p_141[0]={px1: [], px2: [], py1: [], py2: [], pys: []};
    //gr_data4p_141[0]={px1: [], px2: [], py1: [], py2: [], pys: []};
    //gr_data4p_141[1]={px1: [], px2: [], py1: [], py2: [], pys: []};

    ///////////////////////////////////////////////////////////////////////// - 3
    var rr131_t31={
      p  :[1,1,1,1,1,1,1,1,1,1,1,1,],
      x1 :['2022-04','2022-05','2022-06','2022-07','2022-08','2022-09','2022-10','2022-11','2022-12','2023-01','2023-02','2023-03'],
      y1 :[400,450,420,360,340,340,440,521,470,390,395,410],
      y1m:[521]};
    var rr131_t32={
      p  :[1,1,1,1,1,1,1,1,1,1,1,1,],
      x1 :['2022-04','2022-05','2022-06','2022-07','2022-08','2022-09','2022-10','2022-11','2022-12','2023-01','2023-02','2023-03'],
      y1 :[260,200,210,-1000000000,310,320,300,210,220,280,250,210],
      y1m:[430]};
    var rr131_t33={
      p  :[1,1,1,1,1,1,1,1,1,1,1,1,],
      x1 :['2022-04','2022-05','2022-06','2022-07','2022-08','2022-09','2022-10','2022-11','2022-12','2023-01','2023-02','2023-03'],
      y1 :[210,310,360,420,400,340,340,321,-1000000000,210,200,240],
      y1m:[420]};

    //gr_data1_131=form_gr_data1(rr.t1);
    //gr_data2_131=form_gr_data1(rr.t2);
    gr_data31_131=form_gr_data1_131(rr131_t31);
    gr_data32_131=form_gr_data1_131(rr131_t32);
    gr_data33_131=form_gr_data1_131(rr131_t33);
    //gr_data1p_131={px1: [], px2: [], py1: [], py2: [], pys: []};
    //gr_data2p_131={px1: [], px2: [], py1: [], py2: [], pys: []};
    gr_data3p_131={px: [], py: [], pys: []};

    ///////////////////////////////////////////////////////////////////////// - 4
    var rr141_t41={
      p  :[1,1,1,1,1,1,1,1,1,1,1,1,],
      x1 :['2022-04','2022-05','2022-06','2022-07','2022-08','2022-09','2022-10','2022-11','2022-12','2023-01','2023-02','2023-03'],
      y1 :[400,450,420,360,340,340,440,521,470,390,395,410],
      y1m:[521]};
    var rr141_t42={
      p  :[1,1,1,1,1,1,1,1,1,1,1,1,],
      x1 :['2022-04','2022-05','2022-06','2022-07','2022-08','2022-09','2022-10','2022-11','2022-12','2023-01','2023-02','2023-03'],
      y1 :[320,330,310,300,260,270,270,320,330,310,290,275],
      y1m:[330]};
    gr_data41_141=form_gr_data2(rr141_t41); //rr.t2);
    gr_data42_141=form_gr_data2(rr141_t42); //rr.t2);
    //gr_data2_141=generate_data_01_141_2();

    gr_data4p_141=[];
    gr_data4p_141[0]={px1: [], px2: [], py1: [], py2: [], pys: []};
    gr_data4p_141[1]={px1: [], px2: [], py1: [], py2: [], pys: []};
}

function generate_data_00()
{
  let in_gr_data={
    gr_p: [],
    gr_x1: [],
    gr_y1: [],
    gr_y1m: [],
    gr_y2: [],
    gr_y2m: [],

    gr1_p : [],
    gr1_x1: [],
    gr1_y1: [],
    gr1_y1m:[],
    gr1_y1s:[],
    gr1_y2: [],
    gr1_y2m:[],
    gr1_y2s:[],
    gr2_p : [],
    gr2_x1: [],
    gr2_y1: [],
    gr2_y1m:[],
    gr2_y1s:[],
    gr2_y2: [],
    gr2_y2m:[],
    gr2_y2s:[],
    gr3_p : [],
    gr3_x1: [],
    gr3_y1: [],
    gr3_y1m:[],
    gr3_y1s:[],
    gr3_y2: [],
    gr3_y2m:[],
    gr3_y2s:[]
  };
/*
  let gr_p=rr.p;
  let gr_x1=rr.x1;
  let gr_y1=rr.y1;
  let gr_y1m=rr.y1m;
  let gr_y2=rr.y2;
  let gr_y2m=rr.y2m;
*/
  let gr1_p  =[];
  let gr1_x1 =[];
  let gr1_y1 =[];
  let gr1_y1m=[];
  let gr1_y1s=[];
  let gr1_y2 =[];
  let gr1_y2m=[];
  let gr1_y2s=[];
  let gr2_p  =[];
  let gr2_x1 =[];
  let gr2_y1 =[];
  let gr2_y1m=[];
  let gr2_y1s=[];
  let gr2_y2 =[];
  let gr2_y2m=[];
  let gr2_y2s=[];


  let mult_1=1000000;
  let mult_2=1000000;
  let mult_3=1000000;

  let i1=0;
  let i2=0;
  let i3=0;
  let L=4;
  var i =0;
  var ii=0;
  var sY=0;
  var max_11=0;
  var max_12=0;
  var max_21=0;
  var max_22=0;
  var t_xx=[];
  
  for(i=0; i<4; i++)
  {
    gr1_p[i1]=1; //gr_p[i];
    gr1_x1[i1]= ''+(2020+i)+''; //gr_x1[i];
    gr1_y1[i1]= rand(10,20); //gr_y1[i]/mult_1;
    if(max_11<gr1_y1[i1]){max_11=gr1_y1[i1];}
    gr1_y1m[i1]=max_11; //gr_y1m[i]/mult_1;
    gr1_y1s[i1]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr1_y1[i1]));
    gr1_y2[i1]= gr1_y1[i1]*rand(0.2,0.8); //gr_y2[i]/mult_1;
    if(max_12<gr1_y2[i1]){max_12=gr1_y2[i1];}
    gr1_y2m[i1]=max_12; //gr_y2m[i]/mult_1;
    gr1_y2s[i1]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr1_y2[i1]));
    

    sY=gr1_y1[i1];
    t_xx=sub_del(sY,4);
    //max_21=0;
    for(ii=0; ii<4; ii++)
    {
      gr2_p[i2]=2;
      gr2_x1[i2]= 'Q'+(ii+1)+'_'+gr1_x1[i1];
      gr2_y1[i2]= t_xx[ii];
      if(max_21<gr2_y1[i2]){max_21=gr2_y1[i2];}
      gr2_y1m[i2]=max_21;
      gr2_y1s[i2]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr2_y1[i2]));
      gr2_y2[i2]=gr2_y1[i2]*rand(0.2,0.8); 
      if(max_22<gr2_y2[i2]){max_22=gr2_y2[i2];}
      gr2_y2m[i2]=max_22;
      gr2_y2s[i2]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr2_y2[i2]));
      i2=i2+1;
    }

    i1=i1+1;
  }
  for(i=0; i<4; i++)
  {
    gr1_y1m[i]=max_11;
    gr1_y2m[i]=max_12;
  }
  for(i=0; i<4; i++)
  {
    gr2_y1m[i]=max_21;
    gr2_y2m[i]=max_22;
  }

  in_gr_data.gr1_p  =gr1_p;
  in_gr_data.gr1_x1 =gr1_x1;
  in_gr_data.gr1_y1 =gr1_y1;
  in_gr_data.gr1_y1m=gr1_y1m;
  in_gr_data.gr1_y1s=gr1_y1s;
  in_gr_data.gr1_y2 =gr1_y2;
  in_gr_data.gr1_y2m=gr1_y2m;
  in_gr_data.gr1_y2s=gr1_y2s;

  in_gr_data.gr2_p  =gr2_p;
  in_gr_data.gr2_x1 =gr2_x1;
  in_gr_data.gr2_y1 =gr2_y1;
  in_gr_data.gr2_y1m=gr2_y1m;
  in_gr_data.gr2_y1s=gr2_y1s;
  in_gr_data.gr2_y2 =gr2_y2;
  in_gr_data.gr2_y2m=gr2_y2m;
  in_gr_data.gr2_y2s=gr2_y2s;

  return in_gr_data;
}

function generate_data_01()
{
  let in_gr_data={
    gr_p: [],
    gr_x1: [],
    gr_y1: [],
    gr_y1m: [],
    gr_y2: [],
    gr_y2m: [],

    gr1_p : [],
    gr1_x1: [],
    gr1_y1: [],
    gr1_y1m:[],
    gr1_y1s:[],
    gr1_y2: [],
    gr1_y2m:[],
    gr1_y2s:[],
    gr2_p : [],
    gr2_x1: [],
    gr2_y1: [],
    gr2_y1m:[],
    gr2_y1s:[],
    gr2_y2: [],
    gr2_y2m:[],
    gr2_y2s:[],
    gr3_p : [],
    gr3_x1: [],
    gr3_y1: [],
    gr3_y1m:[],
    gr3_y1s:[],
    gr3_y2: [],
    gr3_y2m:[],
    gr3_y2s:[]
  };
/*
  let gr_p=rr.p;
  let gr_x1=rr.x1;
  let gr_y1=rr.y1;
  let gr_y1m=rr.y1m;
  let gr_y2=rr.y2;
  let gr_y2m=rr.y2m;
*/
  let gr1_p  =[];
  let gr1_x1 =[];
  let gr1_y1 =[];
  let gr1_y1m=[];
  let gr1_y1s=[];
  let gr1_y2 =[];
  let gr1_y2m=[];
  let gr1_y2s=[];
  let gr2_p  =[];
  let gr2_x1 =[];
  let gr2_y1 =[];
  let gr2_y1m=[];
  let gr2_y1s=[];
  let gr2_y2 =[];
  let gr2_y2m=[];
  let gr2_y2s=[];


  let mult_1=1000000;
  let mult_2=1000000;
  let mult_3=1000000;

  let i1=0;
  let i2=0;
  let i3=0;
  let L=4;
  var i =0;
  var ii=0;
  var sY=0;
  var max_11=0;
  var max_12=0;
  var max_21=0;
  var max_22=0;
  var t_xx=[];
  
  for(i=0; i<4; i++)
  {
    gr1_p[i1]=1; //gr_p[i];
    gr1_x1[i1]= ''+(2020+i)+''; //gr_x1[i];
    gr1_y1[i1]= rand(10,20); //gr_y1[i]/mult_1;
    if(max_11<gr1_y1[i1]){max_11=gr1_y1[i1];}
    gr1_y1m[i1]=max_11; //gr_y1m[i]/mult_1;
    gr1_y1s[i1]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr1_y1[i1]));
    gr1_y2[i1]= gr1_y1[i1]*rand(0.2,0.8); //gr_y2[i]/mult_1;
    if(max_12<gr1_y2[i1]){max_12=gr1_y2[i1];}
    gr1_y2m[i1]=max_12; //gr_y2m[i]/mult_1;
    gr1_y2s[i1]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr1_y2[i1]));
    

    sY=gr1_y1[i1];
    t_xx=sub_del(sY,4);
    //max_21=0;
    for(ii=0; ii<4; ii++)
    {
      gr2_p[i2]=2;
      gr2_x1[i2]= 'Q'+(ii+1)+'_'+gr1_x1[i1];
      gr2_y1[i2]= t_xx[ii];
      if(max_21<gr2_y1[i2]){max_21=gr2_y1[i2];}
      gr2_y1m[i2]=max_21;
      gr2_y1s[i2]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr2_y1[i2]));
      gr2_y2[i2]=gr2_y1[i2]*rand(0.2,0.8); 
      if(max_22<gr2_y2[i2]){max_22=gr2_y2[i2];}
      gr2_y2m[i2]=max_22;
      gr2_y2s[i2]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr2_y2[i2]));
      i2=i2+1;
    }

    i1=i1+1;
  }
  for(i=0; i<4; i++)
  {
    gr1_y1m[i]=max_11;
    gr1_y2m[i]=max_12;
  }
  for(i=0; i<4; i++)
  {
    gr2_y1m[i]=max_21;
    gr2_y2m[i]=max_22;
  }

  in_gr_data.gr1_p  =gr1_p;
  in_gr_data.gr1_x1 =gr1_x1;
  in_gr_data.gr1_y1 =gr1_y1;
  in_gr_data.gr1_y1m=gr1_y1m;
  in_gr_data.gr1_y1s=gr1_y1s;
  in_gr_data.gr1_y2 =gr1_y2;
  in_gr_data.gr1_y2m=gr1_y2m;
  in_gr_data.gr1_y2s=gr1_y2s;
  in_gr_data.gr2_p  =gr2_p;
  in_gr_data.gr2_x1 =gr2_x1;
  in_gr_data.gr2_y1 =gr2_y1;
  in_gr_data.gr2_y1m=gr2_y1m;
  in_gr_data.gr2_y1s=gr2_y1s;
  in_gr_data.gr2_y2 =gr2_y2;
  in_gr_data.gr2_y2m=gr2_y2m;
  in_gr_data.gr2_y2s=gr2_y2s;

  return in_gr_data;
}

function sub_del(S,n)
{
  let tt=0;
  let k=1;
  let x=[];
  for(i=0;i<n;i++)
  {
    x[i]=rand(0,1);
    tt=tt+x[i];
  }
  k=S/tt;
  for(i=0;i<n;i++)
  {
    x[i]=x[i]*k;
  }
  return x;
}

function generate_data_01_141_2()
{
  let in_gr_data={
    gr_p: [],
    gr_x1: [],
    gr_y1: [],
    gr_y1m: [],
    gr_y2: [],
    gr_y2m: [],

    gr1_p : [],
    gr1_x1: [],
    gr1_y1: [],
    gr1_y1m:[],
    gr1_y1s:[],
    gr1_y2: [],
    gr1_y2m:[],
    gr1_y2s:[],
    gr2_p : [],
    gr2_x1: [],
    gr2_y1: [],
    gr2_y1m:[],
    gr2_y1s:[],
    gr2_y2: [],
    gr2_y2m:[],
    gr2_y2s:[],
    gr3_p : [],
    gr3_x1: [],
    gr3_y1: [],
    gr3_y1m:[],
    gr3_y1s:[],
    gr3_y2: [],
    gr3_y2m:[],
    gr3_y2s:[]
  };
/*
  let gr_p=rr.p;
  let gr_x1=rr.x1;
  let gr_y1=rr.y1;
  let gr_y1m=rr.y1m;
  let gr_y2=rr.y2;
  let gr_y2m=rr.y2m;
*/
  let gr1_p  =[];
  let gr1_x1 =[];
  let gr1_y1 =[];
  let gr1_y1m=[];
  let gr1_y1s=[];
  let gr1_y2 =[];
  let gr1_y2m=[];
  let gr1_y2s=[];
  let gr2_p  =[];
  let gr2_x1 =[];
  let gr2_y1 =[];
  let gr2_y1m=[];
  let gr2_y1s=[];
  let gr2_y2 =[];
  let gr2_y2m=[];
  let gr2_y2s=[];


  let mult_1=1000000;
  let mult_2=1000000;
  let mult_3=1000000;

  let i1=0;
  let i2=0;
  let i3=0;
  let L=4;
  var i =0;
  var ii=0;
  var sY=0;
  var max_11=0;
  var max_12=0;
  var max_21=0;
  var max_22=0;
  var t_xx=[];
  for(i=0; i<4; i++)
  {
    gr1_p[i1]=1; //gr_p[i];
    gr1_x1[i1]= ''+(2020+i)+''; //gr_x1[i];
    gr1_y1[i1]= rand(10,20); //gr_y1[i]/mult_1;
    if(max_11<gr1_y1[i1]){max_11=gr1_y1[i1];}
    gr1_y1m[i1]=max_11; //gr_y1m[i]/mult_1;
    gr1_y1s[i1]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr1_y1[i1]));
    gr1_y2[i1]= gr1_y1[i1]*rand(0.2,0.8); //gr_y2[i]/mult_1;
    if(max_12<gr1_y2[i1]){max_12=gr1_y2[i1];}
    gr1_y2m[i1]=max_12; //gr_y2m[i]/mult_1;
    gr1_y2s[i1]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr1_y2[i1]));
    

    sY=gr1_y1[i1];
    t_xx=sub_del(sY,4);
    //max_21=0;
    for(ii=0; ii<4; ii++)
    {
      gr2_p[i2]=2;
      gr2_x1[i2]= 'Q'+(ii+1)+'_'+gr1_x1[i1];
      gr2_y1[i2]= t_xx[ii];
      if(max_21<gr2_y1[i2]){max_21=gr2_y1[i2];}
      gr2_y1m[i2]=max_21;
      gr2_y1s[i2]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr2_y1[i2]));
      gr2_y2[i2]=gr2_y1[i2]*rand(0.2,0.8); 
      if(max_22<gr2_y2[i2]){max_22=gr2_y2[i2];}
      gr2_y2m[i2]=max_22;
      gr2_y2s[i2]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr2_y2[i2]));
      i2=i2+1;
    }

    i1=i1+1;
  }
  for(i=0; i<4; i++)
  {
    gr1_y1m[i]=max_11;
    gr1_y2m[i]=max_12;
  }
  for(i=0; i<4; i++)
  {
    gr2_y1m[i]=max_21;
    gr2_y2m[i]=max_22;
  }

  in_gr_data.gr1_p  =gr1_p;
  in_gr_data.gr1_x1 =gr1_x1;
  in_gr_data.gr1_y1 =gr1_y1;
  in_gr_data.gr1_y1m=gr1_y1m;
  in_gr_data.gr1_y1s=gr1_y1s;
  in_gr_data.gr1_y2 =gr1_y2;
  in_gr_data.gr1_y2m=gr1_y2m;
  in_gr_data.gr1_y2s=gr1_y2s;
  in_gr_data.gr2_p  =gr2_p;
  in_gr_data.gr2_x1 =gr2_x1;
  in_gr_data.gr2_y1 =gr2_y1;
  in_gr_data.gr2_y1m=gr2_y1m;
  in_gr_data.gr2_y1s=gr2_y1s;
  in_gr_data.gr2_y2 =gr2_y2;
  in_gr_data.gr2_y2m=gr2_y2m;
  in_gr_data.gr2_y2s=gr2_y2s;

  return in_gr_data;
}

