window.addEventListener('resize',resize_111_1);
//let rz_timer=0;
function after_load_111()
{
    set_menu_item(111);
    start_func_111_h_(0);
}
function resize_111_1()
{
    if(show_2d!=1){return;}
    //re_view_edit_111();
    if(rz_timer111_refr==0)
    {
        hide_canv_g(1);
        //hide_canv_g(2);
        rz_timer111_refr=setTimeout("rz_time_refr()",100);
    }
    let dd_111=new Date();
    rz_last_time111 = dd_111.getTime(); 
}
function rz_time_refr()
{
    let dd_111=new Date();
    let curr_time = dd_111.getTime();
    let time_pass=curr_time-rz_last_time111;
    if(time_pass>220)
    {
        clearTimeout(rz_timer111_refr);
        rz_timer111_refr=0;
        //var func=view_all_g();
        //requestAnimationFrame(func);
        view_all_g();
    }
    else
    {
        rz_timer111_refr=setTimeout("rz_time_refr()",100);
    }
}


function GR_test_2(ev)
{
    ev.stopImmediatePropagation();
    get_graph_data();
}

function form_gr_data1(rr)
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
    
    let gr_p=rr.p;
    let gr_x1=rr.x1;
    let gr_y1=rr.y1;
    let gr_y1m=rr.y1m;
    let gr_y2=rr.y2;
    let gr_y2m=rr.y2m;

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
    let gr3_p  =[];
    let gr3_x1 =[];
    let gr3_y1 =[];
    let gr3_y1m=[];
    let gr3_y1s=[];
    let gr3_y2 =[];
    let gr3_y2m=[];
    let gr3_y2s=[];

    let mult_1=1; //1000000;
    let mult_2=1; //1000000;
    let mult_3=1; //1000000;

    let i1=0;
    let i2=0;
    let i3=0;
    let L=gr_p.length;
    for( i=0;i<L;i++)
    {
        //gr_y1s[i]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr_y1[i]));
        if(gr_p[i]==1)
        {
            gr1_p[i1]=gr_p[i];
            gr1_x1[i1]=gr_x1[i];
            gr1_y1[i1]=gr_y1[i]/mult_1;
            gr1_y1m[i1]=gr_y1m[i]/mult_1;
            gr1_y1s[i1]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr1_y1[i1]));
            gr1_y2[i1]=gr_y2[i]/mult_1;
            gr1_y2m[i1]=gr_y2m[i]/mult_1;
            gr1_y2s[i1]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr1_y2[i1]));
            i1=i1+1;
        }
        else if(gr_p[i]==2)
        {
            gr2_p[i2]=gr_p[i];
            gr2_x1[i2]=gr_x1[i];
            gr2_y1[i2]=gr_y1[i]/mult_2;
            gr2_y1m[i2]=gr_y1m[i]/mult_2;
            gr2_y1s[i2]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr2_y1[i2]));
            gr2_y2[i2]=gr_y2[i]/mult_2;
            gr2_y2m[i2]=gr_y2m[i]/mult_2;
            gr2_y2s[i2]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr2_y2[i2]));
            i2=i2+1;
        }
        else if(gr_p[i]==3)
        {
            gr3_p[i3]=gr_p[i];
            gr3_x1[i3]=gr_x1[i];
            gr3_y1[i3]=gr_y1[i]/mult_3;
            gr3_y1m[i3]=gr_y1m[i]/mult_3;
            gr3_y1s[i3]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr3_y1[i3]));
            gr3_y2[i3]=gr_y2[i]/mult_3;
            gr3_y2m[i3]=gr_y2m[i]/mult_3;
            gr3_y2s[i3]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr3_y2[i3]));
            i3=i3+1;
        }
    }
    
    in_gr_data.gr_p=gr_p;
    in_gr_data.gr_x1=gr_x1;
    in_gr_data.gr_y1=gr_y1;
    in_gr_data.gr_y1m=gr_y1m;
    in_gr_data.gr_y2=gr_y2;
    in_gr_data.gr_y2m=gr_y2m;

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
    in_gr_data.gr3_p  =gr3_p;
    in_gr_data.gr3_x1 =gr3_x1;
    in_gr_data.gr3_y1 =gr3_y1;
    in_gr_data.gr3_y1m=gr3_y1m;
    in_gr_data.gr3_y1s=gr3_y1s;
    in_gr_data.gr3_y2 =gr3_y2;
    in_gr_data.gr3_y2m=gr3_y2m;
    in_gr_data.gr3_y2s=gr3_y2s;
    return in_gr_data;
}

function form_gr_data1_131(rr)
{
    let in_gr_data={
        gr_p: [],
        gr_x1: [],
        gr_y1: [],
        gr_y1m: [],

        gr1_p : [],
        gr1_x1: [],
        gr1_y1: [],
        gr1_y1m:[],
        gr1_y1s:[],
        gr2_p : [],
        gr2_x1: [],
        gr2_y1: [],
        gr2_y1m:[],
        gr2_y1s:[],
        gr3_p : [],
        gr3_x1: [],
        gr3_y1: [],
        gr3_y1m:[],
        gr3_y1s:[]
    };
    
    let gr_p=rr.p;
    let gr_x1=rr.x1;
    let gr_y1=rr.y1;
    let gr_y1m=rr.y1m;

    let gr1_p  =[];
    let gr1_x1 =[];
    let gr1_y1 =[];
    let gr1_y1m=[];
    let gr1_y1s=[];
    let gr2_p  =[];
    let gr2_x1 =[];
    let gr2_y1 =[];
    let gr2_y1m=[];
    let gr2_y1s=[];
    let gr3_p  =[];
    let gr3_x1 =[];
    let gr3_y1 =[];
    let gr3_y1m=[];
    let gr3_y1s=[];

    let mult_1=1;//1000000;
    let mult_2=1;//1000000;
    let mult_3=1;//1000000;

    let i1=0;
    let i2=0;
    let i3=0;
    let L=gr_p.length;
    for( i=0;i<L;i++)
    {
        //gr_y1s[i]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr_y1[i]));
        if(gr_p[i]==1)
        {
            gr1_p[i1]=gr_p[i];
            gr1_x1[i1]=gr_x1[i];
            gr1_y1[i1]=gr_y1[i]/mult_1;
            gr1_y1m[i1]=gr_y1m[i]/mult_1;
            gr1_y1s[i1]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr1_y1[i1]));
            i1=i1+1;
        }
        else if(gr_p[i]==2)
        {
            gr2_p[i2]=gr_p[i];
            gr2_x1[i2]=gr_x1[i];
            gr2_y1[i2]=gr_y1[i]/mult_2;
            gr2_y1m[i2]=gr_y1m[i]/mult_2;
            gr2_y1s[i2]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr2_y1[i2]));
            i2=i2+1;
        }
        else if(gr_p[i]==3)
        {
            gr3_p[i3]=gr_p[i];
            gr3_x1[i3]=gr_x1[i];
            gr3_y1[i3]=gr_y1[i]/mult_3;
            gr3_y1m[i3]=gr_y1m[i]/mult_3;
            gr3_y1s[i3]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr3_y1[i3]));
            i3=i3+1;
        }
    }
    
    in_gr_data.gr_p=gr_p;
    in_gr_data.gr_x1=gr_x1;
    in_gr_data.gr_y1=gr_y1;
    in_gr_data.gr_y1m=gr_y1m;

    in_gr_data.gr1_p  =gr1_p;
    in_gr_data.gr1_x1 =gr1_x1;
    in_gr_data.gr1_y1 =gr1_y1;
    in_gr_data.gr1_y1m=gr1_y1m;
    in_gr_data.gr1_y1s=gr1_y1s;
    in_gr_data.gr2_p  =gr2_p;
    in_gr_data.gr2_x1 =gr2_x1;
    in_gr_data.gr2_y1 =gr2_y1;
    in_gr_data.gr2_y1m=gr2_y1m;
    in_gr_data.gr2_y1s=gr2_y1s;
    in_gr_data.gr3_p  =gr3_p;
    in_gr_data.gr3_x1 =gr3_x1;
    in_gr_data.gr3_y1 =gr3_y1;
    in_gr_data.gr3_y1m=gr3_y1m;
    in_gr_data.gr3_y1s=gr3_y1s;
    return in_gr_data;
}


function hide_canv_g(nc)
{
    if(rz_timer111_refr!=0)
    {
        clearTimeout(rz_timer111_refr);
        rz_timer111_refr=0;
    }
    let c1=document.getElementById("cnv"+nc);
    let cd=document.getElementById("cnv_div"+nc);
    if(c1){c1.style.display="none";}
    if(cd){cd.style.display="none";}
}
function view_all_g()
{
    if(rz_timer111_refr!=0)
    {
        clearTimeout(rz_timer111_refr);
        rz_timer111_refr=0;
    }
    last_time_G=0;

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

    disp_all_elem();

}
function get_graph_data_simple()
{
    let re="{x1:['2019','2020','2021','2022'], y1:[1000.2,1200.4,1300.6,1100.8]}";
    let rr=eval("("+re+")");
    let x1=rr.x1;
    let y1=rr.y1;
    return rr;
}
function draw_graph_data(nc,gr_part)
{
    //let c=document.getElementById("cnv"+nc);
    let c=document.getElementById("canvas2D");
    
    if(!c){return;}
    let gr_data0;
    let gr_data = {gr1_p:[], gr1_x1: [], gr1_y1: [], gr1_y1m: [], gr1_y1s: [], gr1_y2: [], gr1_y2m: [], gr1_y2s: [], gr2_p:[], gr2_x1: [], gr2_y1: [], gr2_y1m: [], gr2_y1s: [], gr2_y2: [], gr2_y2m: [], gr2_y2s: []};
    let rect_color="#AAFFCC";
    if(nc==1)
    {
        gr_data0=gr_data1_111;
    }
    else if(nc==2)
    {
        //rect_color="#5ba1db";
        gr_data0=gr_data2_111;
        //gr_data =gr_data2_111;
    }

    let g_p  =[];
    let g_x1 =[];
    let g_y1 =[];
    let g_y1m=[];
    let g_y1s=[];
    
    let avg_color="";

    if(gr_part==1)
    {
        let L=gr_data0.gr1_x1.length;
        for(let i=0; i<L; i++)
        {
            gr_data.gr1_p[i]=gr_data0.gr1_p[i];
            gr_data.gr1_x1[i]=gr_data0.gr1_x1[i];
            gr_data.gr1_y1[i]=gr_data0.gr1_y1[i];
            gr_data.gr1_y1m[i]=gr_data0.gr1_y1m[i];
            gr_data.gr1_y1s[i]=gr_data0.gr1_y1s[i];
            gr_data.gr1_y2[i]=gr_data0.gr1_y2[i];
            gr_data.gr1_y2m[i]=gr_data0.gr1_y2m[i];
            gr_data.gr1_y2s[i]=gr_data0.gr1_y2s[i];
        }
    }
    else if(gr_part==2)
    {
        let L=gr_data0.gr2_x1.length;
        for(let i=0; i<L; i++)
        {
            gr_data.gr1_p[i]=gr_data0.gr2_p[i];
            gr_data.gr1_x1[i]=gr_data0.gr2_x1[i];
            gr_data.gr1_y1[i]=gr_data0.gr2_y1[i];
            gr_data.gr1_y1m[i]=gr_data0.gr2_y1m[i];
            gr_data.gr1_y1s[i]=gr_data0.gr2_y1s[i];
            gr_data.gr1_y2[i]=gr_data0.gr2_y2[i];
            gr_data.gr1_y2m[i]=gr_data0.gr2_y2m[i];
            gr_data.gr1_y2s[i]=gr_data0.gr2_y2s[i];
        }
        avg_color='#FFFF44';
    }

    active_i_111=-1;

    if(nc==1)
    {
        let gr_add_data={
            rect_color:  '#fd961f',
            rect_Hcolor: '#ffb64f',
            rect_HWidth: 10,
            rect2_color:  '#fd501f',
            rect2_Hcolor: '#ff703f',
            rect2_HWidth: 8,
            in_data: gr_data};
        draw_graph_01(c,0,avg_color,gr_add_data,'млн.руб.',gr_data1p_111,last_img_111[nc-1],-1);
    }
    else if(nc==2)
    {
        let gr_add_data={
            rect_color:  '#5ba1db',
            rect_Hcolor: '#8bc1fb',
            rect_HWidth: 10,
            rect2_color:  '#fd501f',
            rect2_Hcolor: '#ff703f',
            rect2_HWidth: 8,
            in_data: gr_data};
        draw_graph_01(c,1,avg_color,gr_add_data,'млн.руб.',gr_data2p_111,last_img_111[nc-1],-1);
    }
}

function GR_func_111(ev,obj,st,cn)
{
    //return;
    clearTimeout(timer111_last);
    let dd_time=new Date();
    let new_time = dd_time.getTime();
    if(last_time_G==0)
    {
        last_time_G=new_time;
    }
    else
    {
        let dlt=new_time-last_time_G;
        if(dlt<50 && st==0)
        {
            timer111_last=setTimeout(GR_func_111,110,ev,obj,1,cn);
            return;
        }
        else
        {
            last_time_G=new_time;
        }
    }

    //var context = obj.getContext("2d");
    
    let sx=(ev.pageX-obj.offsetLeft);
    let sy=(ev.pageY-obj.offsetTop);
    let kx=obj.width/obj.clientWidth;
    let ky=obj.height/obj.clientHeight;
    let new_i=-1;
    let m_data;
    if(cn==1)
    {
        m_data=gr_data1p_111;
    }
    else if(cn==2)
    {
        m_data=gr_data2p_111;
    }

    new_i=get_active1_i(sx*kx,sy*ky,m_data);

    if(active_i_111==new_i)
    {
        return;
    }

    if(active_i_111>=0)
    {
        //context.fillRect(GR_data1_x[new_i]-30,GR_data1_y[new_i]-30,60,60);
        graw_point1(active_i_111,obj,cn-1,0,m_data,last_img_111[cn-1]);
    }


    let avg_color="";
    if(new_i>=0)
    {
        if(cn==1)
        {
            let gr_data0=gr_data1_111;
            let gr_data = {gr1_p:[], gr1_x1: [], gr1_y1: [], gr1_y1m: [], gr1_y1s: [], gr1_y2: [], gr1_y2m: [], gr1_y2s: [], gr2_p:[], gr2_x1: [], gr2_y1: [], gr2_y1m: [], gr2_y1s: [], gr2_y2: [], gr2_y2m: [], gr2_y2s: []};
            if(g_mode1_111==1)
            {
                avg_color='';

                let L=gr_data0.gr1_x1.length;
                for(let i=0; i<L; i++)
                {
                    gr_data.gr1_p[i]=gr_data0.gr1_p[i];
                    gr_data.gr1_x1[i]=gr_data0.gr1_x1[i];
                    gr_data.gr1_y1[i]=gr_data0.gr1_y1[i];
                    gr_data.gr1_y1m[i]=gr_data0.gr1_y1m[i];
                    gr_data.gr1_y1s[i]=gr_data0.gr1_y1s[i];
                    gr_data.gr1_y2[i]=gr_data0.gr1_y2[i];
                    gr_data.gr1_y2m[i]=gr_data0.gr1_y2m[i];
                    gr_data.gr1_y2s[i]=gr_data0.gr1_y2s[i];
                }
            }
            else if(g_mode1_111==2)
            {
                avg_color='#FFFF44';

                let L=gr_data0.gr2_x1.length;
                for(let i=0; i<L; i++)
                {
                    gr_data.gr1_p[i]=gr_data0.gr2_p[i];
                    gr_data.gr1_x1[i]=gr_data0.gr2_x1[i];
                    gr_data.gr1_y1[i]=gr_data0.gr2_y1[i];
                    gr_data.gr1_y1m[i]=gr_data0.gr2_y1m[i];
                    gr_data.gr1_y1s[i]=gr_data0.gr2_y1s[i];
                    gr_data.gr1_y2[i]=gr_data0.gr2_y2[i];
                    gr_data.gr1_y2m[i]=gr_data0.gr2_y2m[i];
                    gr_data.gr1_y2s[i]=gr_data0.gr2_y2s[i];
                }
            }
            let gr_add_data={
                rect_color:  '#fd961f',
                rect_Hcolor: '#ffb64f',
                rect_HWidth: 10,
                rect2_color:  '#fd501f',
                rect2_Hcolor: '#ff703f',
                rect2_HWidth: 8,
                in_data: gr_data};
            //draw_graph_01(c,1,rect_color,'',g_x1,g_y1,g_y1m,g_y1s,'тыс.руб/чел.',m_data,last_img_131[cn-1],new_i);
            draw_graph_01(obj,0,avg_color,gr_add_data,'тыс.руб/чел.',m_data,last_img_111[cn-1],new_i);
            graw_point1(new_i,obj,0,1,m_data,last_img_111[cn-1]);
        }
        else if(cn==2)
        {
            let gr_data0=gr_data2_111;
            let gr_data = {gr1_p:[], gr1_x1: [], gr1_y1: [], gr1_y1m: [], gr1_y1s: [], gr1_y2: [], gr1_y2m: [], gr1_y2s: [], gr2_p:[], gr2_x1: [], gr2_y1: [], gr2_y1m: [], gr2_y1s: [], gr2_y2: [], gr2_y2m: [], gr2_y2s: []};
            if(g_mode2_111==1)
            {
                avg_color='';

                let L=gr_data0.gr1_x1.length;
                for(let i=0; i<L; i++)
                {
                    gr_data.gr1_p[i]=gr_data0.gr1_p[i];
                    gr_data.gr1_x1[i]=gr_data0.gr1_x1[i];
                    gr_data.gr1_y1[i]=gr_data0.gr1_y1[i];
                    gr_data.gr1_y1m[i]=gr_data0.gr1_y1m[i];
                    gr_data.gr1_y1s[i]=gr_data0.gr1_y1s[i];
                    gr_data.gr1_y2[i]=gr_data0.gr1_y2[i];
                    gr_data.gr1_y2m[i]=gr_data0.gr1_y2m[i];
                    gr_data.gr1_y2s[i]=gr_data0.gr1_y2s[i];
                }
            }
            else if(g_mode2_111==2)
            {
                avg_color='#FFFF44';

                let L=gr_data0.gr2_x1.length;
                for(let i=0; i<L; i++)
                {
                    gr_data.gr1_p[i]=gr_data0.gr2_p[i];
                    gr_data.gr1_x1[i]=gr_data0.gr2_x1[i];
                    gr_data.gr1_y1[i]=gr_data0.gr2_y1[i];
                    gr_data.gr1_y1m[i]=gr_data0.gr2_y1m[i];
                    gr_data.gr1_y1s[i]=gr_data0.gr2_y1s[i];
                    gr_data.gr1_y2[i]=gr_data0.gr2_y2[i];
                    gr_data.gr1_y2m[i]=gr_data0.gr2_y2m[i];
                    gr_data.gr1_y2s[i]=gr_data0.gr2_y2s[i];
                }
            }
            let gr_add_data={
                rect_color:  '#5ba1db',
                rect_Hcolor: '#8bc1fb',
                rect_HWidth: 10,
                rect2_color:  '#fd501f',
                rect2_Hcolor: '#ff703f',
                rect2_HWidth: 8,
                in_data: gr_data};
            //draw_graph_01(c,1,rect_color,'',g_x1,g_y1,g_y1m,g_y1s,'тыс.руб/чел.',m_data,last_img_131[cn-1],new_i);
            draw_graph_01(obj,1,avg_color,gr_add_data,'тыс.руб.',m_data,last_img_111[cn-1],new_i);
            graw_point1(new_i,obj,1,1,m_data,last_img_111[cn-1]);
        }
    }
    active_i_111=new_i;

    
}




///////////////////////////////////

function draw_graph_data_141(nc)
{
    //let Pn=1; //круги
    //let c=document.getElementById("cnv"+nc);
    let c=document.getElementById("canvas2D");
    if(!c){return;}
    var context = c.getContext("2d");

    //let Z=DGRM_params[Pn].Z;
    //let A=DGRM_params[Pn].A*c.clientWidth;
    //let B=DGRM_params[Pn].B*c.clientHeight;

    active_i_141=-1;

    if(nc==1)
    {
        draw_cnv_01_141(c,gr_data1p_141,{tp:-1,nn:-1,xn:-1});
    }
    else if(nc==2)
    {
        draw_cnv_02_141(c,gr_data2p_141,{tp:-1,nn:-1,xn:-1});
    }
    else if(nc==3)
    {
        draw_cnv_03_141(c,gr_data3p_141,{tp:-1,nn:-1,xn:-1});
    }
    else if(nc==4)
    {
        draw_cnv_04_141(c,gr_data4p_141,{tp:-1,nn:-1,xn:-1}, 1);
    }
}

function GR_func_141(ev,obj,st,cn)
{
    //if(cn==2){return;}
    clearTimeout(timer141_last);
    let dd_loc=new Date();
    let new_time141 = dd_loc.getTime();
    if(last_time_G==0)
    {
        last_time_G=new_time141;
    }
    else
    {
        let dlt=new_time141-last_time_G;
        if(dlt<50 && st==0)
        {
            timer141_last=setTimeout(GR_func_141,110,ev,obj,1,cn);
            return;
        }
        else
        {
            last_time_G=new_time141;
        }
    }

    var context = obj.getContext("2d");
    var Pn=1;

    let sx=(ev.pageX-obj.offsetLeft);
    let sy=(ev.pageY-obj.offsetTop);
    let kx=obj.width/obj.clientWidth;
    let ky=obj.height/obj.clientHeight;
    let new_i=-1;
    let m_data;

    if(cn==2)
    {
        Pn=1;
        m_data=gr_data2p_141;
        new_i=get_active5_i(sx*kx,sy*ky,m_data); // круги
    }
    else if(cn==4)
    {
        Pn=3;
        m_data=gr_data4p_141;
        new_i=get_active4_i(sx*kx,sy*ky,m_data);
    }

    
    //if(cn==2){return;}
    
    //new_i=get_active4_i(sx*kx,sy*ky,m_data);
    /*
    else if(cn==3)
    {
        m_data=gr_data3p_141;
        new_i=get_active2_i(sx*kx,sy*ky,m_data);
    }
*/
    if(active_i_141.nn==new_i.nn && active_i_141.xn==new_i.xn && active_i_141.tp==new_i.tp)
    {
        return;
    }

    
    if(active_i_141.xn>=0)
    {
        graw_point4(active_i_141,obj,Pn/*Pn*/,0,m_data,last_img_141[cn-1]);
    }

    DGRM_params[Pn].on=0;
    if(new_i.xn>=0)
    {
        DGRM_params[Pn].on=1;
        //context.fillRect(GR_data1_x[new_i]-30,GR_data1_y[new_i]-30,60,60);
        if(cn==1)
        {
            draw_cnv_01_141(obj,m_data,new_i);
        }
        else if(cn==2)
        {
            draw_cnv_02_141(obj,m_data,new_i);
        }
        else if(cn==3)
        {
            draw_cnv_03_141(obj,m_data,new_i);
        }
        else if(cn==4)
        {
            draw_cnv_04_141(obj,m_data,new_i,0);
        }
        graw_point4(new_i,obj,Pn/*Pn*/,1,m_data,last_img_141[cn-1]);
    }
    
    active_i_141={nn:new_i.nn,xn:new_i.xn,tp:new_i.tp};
}

function draw_cnv_01_141(obj,mp_data,NH)
{
    let gr_add_data0={
        color:  '#fd961f',
        Hcolor: '#ffb64f',
        point_color: '#ffb64f',
        Width: 6,
        HWidth: 10,
        axis_X: 5,
        axis_X_color: '#AAAAAA',
        axis_S_color: '#FFFFFF',
        axis_S_Hcolor: '#999999',
        axis_Y: 5,
        axis_Y_color: '#AAAAAA',
        yK: 1,
        px0_1: 100,
        px0_2: 20,
        fp: 0.65,
        in_data: gr_data1_141[0]};

    draw_graph_04H(obj,1,'',gr_add_data0,'деньги',mp_data[0],get_HNxn(NH,0));
    //draw_graph_05(obj,0,   gr_add_data1,''  ,mp_data[1],last_img_141[3],get_HNxn(NH,1));
}
function draw_cnv_02_141(obj,mp_data,NH)
{
    let gr_add_data0={
        color:  '#5ba1db',
        Hcolor: '#8bc1fb',
        point_color: '#ffb64f',
        Width: 6,
        HWidth: 10,
        axis_X: 5,
        axis_X_color: '',
        axis_Y: 5,
        axis_Y_color: '#AAAAAA',
        yK: 1,
        px0_1: 40,
        px0_2: 20,
        py0_1: 100,
        py0_2: 40,
        fp: 0.65,
        in_data: gr_data2_141[0]};

    draw_graph_06(obj,1,1,'',gr_add_data0,'тыс.руб.',mp_data[0],last_img_141[1/*Pn*/],get_HNxn(NH,0));
    //draw_graph_05(obj,0,   gr_add_data1,''  ,mp_data[1],last_img_141[3],get_HNxn(NH,1));
}
function draw_cnv_03_141(obj,mp_data,NH)
{
    let gr_add_data0={
        color:  '#fd961f',
        Hcolor: '#ffb64f',
        point_color: '#ffb64f',
        Width: 6,
        HWidth: 10,
        axis_X: 5,
        axis_X_color: '#AAAAAA',
        axis_S_color: '#FFFFFF',
        axis_S_Hcolor: '#999999',
        axis_Y: 5,
        axis_Y_color: '#AAAAAA',
        yK: 1,
        px0_1: 20,
        px0_2: 20,
        fp: 0.65,
        in_data: gr_data3_141[g_mode3_141-1]};

    let str_='';
    let avg_color='';
    if(g_mode3_141==1)
    {str_='млн.руб';} //Год
    else if(g_mode3_141==2)
    {str_='Квартал';avg_color='#55FF55';}
    else if(g_mode3_141==3)
    {str_='Месяц'; avg_color='#55FF55';}
    draw_graph_04(obj,1,avg_color,gr_add_data0,str_,mp_data[0],get_HNxn(NH,0));
    //draw_graph_05(obj,0,   gr_add_data1,''  ,mp_data[1],last_img_141[3],get_HNxn(NH,1));
}
function draw_cnv_04_141(obj,mp_data,NH,snap)
{
    let gr_add_data0={
        color:  '#5ba1db',
        Hcolor: '#8bc1fb',
        point_color: '#ffb64f',
        Width: 6,
        HWidth: 10,
        axis_X: 5,
        axis_X_color: '#AAAAAA',
        axis_S_color: '#FFFFFF',
        axis_S_Hcolor: '#999999',
        axis_Y: 5,
        axis_Y_color: '#AAAAAA',
        yK: 1,
        px0_1: 75,
        px0_2: 25,
        fp: 0.65,
        in_data: gr_data41_141[g_mode4_141-1]};
    let gr_add_data1={
        color:  '#22AA22',
        Hcolor: '#33BB33',
        point_color: '#ffb64f',
        Width: 6,
        HWidth: 10,
        axis_X: 5,
        axis_X_color: '',
        axis_S_color: '',
        axis_S_Hcolor: '',
        axis_Y: 5,
        axis_Y_color: '#AAAAAA',
        yK: 0.9,
        px0_1: 75,
        px0_2: 25,
        fp: 0.65,
        in_data: gr_data42_141[g_mode4_141-1]};

    let str_='';
    if(g_mode4_141==1)
    {str_='млн.руб';} //Год
    else if(g_mode4_141==2)
    {str_='Квартал';}
    else if(g_mode4_141==3)
    {str_='Месяц';}
    if(get_HNxn(NH,1)>=0)
    {
        gr_add_data0.axis_S_color='';
    }
    //let snap=1;
    //if(NH.)
    draw_graph_04(obj,3, 1,'',gr_add_data0,str_,mp_data[0],last_img_141[3/*Pn*/],   0,get_HNxn(NH,0));
    draw_graph_05(obj,3, 0,   gr_add_data1,''  ,mp_data[1],last_img_141[3/*Pn*/],snap,get_HNxn(NH,1));
}

function seq_def_color(i,a,h)
{
    let r=[ 250,  20, 100, 230,  50];
    let g=[ 145, 110, 200, 230,  50];
    let b=[  24,  30,  50,  20, 240];

    let rh=[ 255,  30, 120, 230,  60];
    let gh=[ 160, 130, 222, 230,  60];
    let bh=[  30,  44,  65,  20, 255];

    let L=r.length;
    let k=0;
    for(let n=0; n<200; n++)
    {
        if(k>=L)
        {
            k=0;
        }
        if(n>=i)
        {
            if(h==1)
            {
                return "rgba("+rh[k]+","+gh[k]+","+bh[k]+","+a+")";
            }
            else
            {
                return "rgba("+r[k]+","+g[k]+","+b[k]+","+a+")";
            }
        }
        k=k+1;
    }

    return "rgba(100,100,100,100)";

}

////////////////////////////// 131 - lines
function draw_graph_data_131(nc,gr_part)
{
    //let c=document.getElementById("cnv"+nc);
    let c=document.getElementById("canvas2D");
    let gr_data;
    let rect_color="#AAFFCC";
    if(nc==1)
    {
        rect_color="#fd961f";
        gr_data=gr_data1_131;
    }
    else if(nc==2)
    {
        rect_color="#5ba1db";
        gr_data=gr_data2_131;
    }
    else if(nc==3)
    {
        rect_color="#5bdba1";
        gr_data=gr_data31_131;
    }

    let g_p  =[];
    let g_x1 =[];
    let g_y1 =[];
    let g_y1m=[];
    let g_y1s=[];

    if(gr_part==1)
    {
        g_p=gr_data.gr1_p;
        g_x1=gr_data.gr1_x1;
        g_y1=gr_data.gr1_y1;
        g_y1m=gr_data.gr1_y1m;
        g_y1s=gr_data.gr1_y1s;
    }
    else if(gr_part==2)
    {
        g_p=gr_data.gr2_p;
        g_x1=gr_data.gr2_x1;
        g_y1=gr_data.gr2_y1;
        g_y1m=gr_data.gr2_y1m;
        g_y1s=gr_data.gr2_y1s;
    }
    else if(gr_part==3)
    {
        g_p=gr_data.gr3_p;
        g_x1=gr_data.gr3_x1;
        g_y1=gr_data.gr3_y1;
        g_y1m=gr_data.gr3_y1m;
        g_y1s=gr_data.gr3_y1s;
    }
    active_i_131=-1;

    if(nc==1)
    {
        //draw_graph_01(nc,c,1,rect_color,'',g_x1,g_y1,g_y1m,g_y1s,'тыс.руб/чел.');
        let gr_add_data={
            rect_color:  '#fd961f',
            rect_Hcolor: '#ffb64f',
            rect_HWidth: 10,
            in_data: gr_data};
        draw_graph_01(c,'',      gr_add_data,'тыс.руб/чел.',gr_data1p_131,last_img_131[nc-1],-1);
        ///draw_graph_01(c,1,rect_color,'',g_x1,g_y1,g_y1m,g_y1s,'тыс.руб/чел.',gr_data1p_131,last_img_131[nc-1],-1);
    }
    else if(nc==2)
    {
        //draw_graph_01(nc,c,1,rect_color,'#00FF00',g_x1,g_y1,g_y1m,g_y1s,'тыс.руб.');
        let gr_add_data={
            rect_color:  '#5ba1db',
            rect_Hcolor: '#8bc1fb',
            rect_HWidth: 10,
            in_data: gr_data};
        draw_graph_01(c,'#00FF00',gr_add_data,'тыс.руб.',gr_data2p_131,last_img_131[nc-1],-1);
        ///draw_graph_01(c,1,rect_color,'#00FF00',g_x1,g_y1,g_y1m,g_y1s,'тыс.руб.',gr_data2p_131,last_img_131[nc-1],-1);
    }
    else if(nc==3)
    {
        let max_y=gr_data31_131.gr1_y1m[0];
        if(max_y<gr_data32_131.gr1_y1m[0])
        {
            max_y=gr_data32_131.gr1_y1m[0];
        }
        if(max_y<gr_data33_131.gr1_y1m[0])
        {
            max_y=gr_data33_131.gr1_y1m[0];//5bdba1
        }
        let gr_add_data={
            line_color:  [],
            line_Width:  [],
            line_Hcolor:  [],
            line_HWidth:  [],
            point_color: [],
            in_data: []};
        gr_add_data.line_color[0]='#dd961f';
        gr_add_data.line_color[1]='#5bfb5b';
        gr_add_data.line_color[2]='#ebeb2b';
        gr_add_data.line_Width[0]=6;
        gr_add_data.line_Width[1]=6;
        gr_add_data.line_Width[2]=6;
        gr_add_data.line_Hcolor[0]='#EdA61f';
        gr_add_data.line_Hcolor[1]='#6bff6b';
        gr_add_data.line_Hcolor[2]='#FbFb2b';
        gr_add_data.line_HWidth[0]=10;
        gr_add_data.line_HWidth[1]=10;
        gr_add_data.line_HWidth[2]=10;
        gr_add_data.point_color[0]='#FFFFFF';
        gr_add_data.point_color[1]='#ebeb2b';
        gr_add_data.point_color[2]='#ed861f';
        gr_add_data.in_data[0]=gr_data31_131;
        gr_add_data.in_data[1]=gr_data32_131;
        gr_add_data.in_data[2]=gr_data33_131;
        //draw_graph_02(c,1,"#dd961f","#FFFFFF",gr_data31_131.gr1_x1,gr_data31_131.gr1_y1,max_y,gr_data31_131.gr1_y1s,'тыс.руб.');
        //draw_graph_02(c,0,"#5bfb5b","#dd961f",gr_data32_131.gr1_x1,gr_data32_131.gr1_y1,max_y,gr_data32_131.gr1_y1s,'тыс.руб.');
        //draw_graph_02(c,0,"#abfb5b","#dd961f",gr_data33_131.gr1_x1,gr_data33_131.gr1_y1,max_y,gr_data33_131.gr1_y1s,'тыс.руб.');
        draw_graph_03(c,2,gr_add_data,'тыс.руб.',gr_data3p_131,last_img_131[nc-1],-1,-1);
    }
}

function GR_func_131(ev,obj,st,cn)
{
    //return;
    clearTimeout(timer131_last);
    let dd_131=new Date();
    let new_time131 = dd_131.getTime();
    if(last_time_G==0)
    {
        last_time_G=new_time131;
    }
    else
    {
        let dlt=new_time131-last_time_G;
        if(dlt<50 && st==0)
        {
            timer131_last=setTimeout(GR_func_131,110,ev,obj,1,cn);
            return;
        }
        else
        {
            last_time_G=new_time131;
        }
    }

    var context = obj.getContext("2d");
    
    let sx=(ev.pageX-obj.offsetLeft);
    let sy=(ev.pageY-obj.offsetTop);
    let kx=obj.width/obj.clientWidth;
    let ky=obj.height/obj.clientHeight;
    let new_i=-1;
    let m_data;

    if(cn==1)
    {
        m_data=gr_data1p_131;
        new_i=get_active1_i(sx*kx,sy*ky,m_data);
    }
    else if(cn==2)
    {
        m_data=gr_data2p_131;
        new_i=get_active1_i(sx*kx,sy*ky,m_data);
    }
    else if(cn==3)
    {
        m_data=gr_data3p_131;
        new_i=get_active2_i(sx*kx,sy*ky,m_data);
    }

    if(active_i_131==new_i)
    {
        return;
    }

    if(active_i_131>=0)
    {
        //context.fillRect(GR_data1_x[new_i]-30,GR_data1_y[new_i]-30,60,60);
        if(cn==3)
        {
            graw_point2(active_i_131,obj,2/*Pn*/,0,m_data,last_img_131[cn-1]);
        }
        else
        {
            graw_point1(active_i_131,context,0,m_data,last_img_131[cn-1]);
        }
    }

    DGRM_params[2].on=0; // Pn=2
    if(new_i>=0)
    {
        DGRM_params[2].on=1; // Pn=2
        //context.fillRect(GR_data1_x[new_i]-30,GR_data1_y[new_i]-30,60,60);
        if(cn==3)
        {
            let gr_add_data={
                line_color:  [],
                line_Width:  [],
                line_Hcolor:  [],
                line_HWidth:  [],
                point_color: [],
                in_data: []};

            let nx=Math.floor(new_i);
            let ny=Math.round((new_i-nx)*100);

            gr_add_data.line_color[0]='#dd961f';
            gr_add_data.line_color[1]='#5bfb5b';
            gr_add_data.line_color[2]='#ebeb2b';
            gr_add_data.line_Width[0]=6;
            gr_add_data.line_Width[1]=6;
            gr_add_data.line_Width[2]=6;
            gr_add_data.line_Hcolor[0]='#EdA61f';
            gr_add_data.line_Hcolor[1]='#6bff6b';
            gr_add_data.line_Hcolor[2]='#FbFb2b';
            gr_add_data.line_HWidth[0]=10;
            gr_add_data.line_HWidth[1]=10;
            gr_add_data.line_HWidth[2]=10;
            gr_add_data.point_color[0]='#FFFFFF';
            gr_add_data.point_color[1]='#ebeb2b';
            gr_add_data.point_color[2]='#ed861f';
            gr_add_data.in_data[0]=gr_data31_131;
            gr_add_data.in_data[1]=gr_data32_131;
            gr_add_data.in_data[2]=gr_data33_131;

            draw_graph_03(obj,2,gr_add_data,'тыс.руб.',m_data,last_img_131[cn-1],ny,nx);
            graw_point2(new_i,obj,2/*Pn*/,1,m_data,last_img_131[cn-1]);
        }
        else if(cn==1)
        {
            let gr_add_data={
                rect_color:  '#fd961f',
                rect_Hcolor: '#ffb64f',
                rect_HWidth: 10,
                in_data: gr_data1_131};
            //draw_graph_01(c,1,rect_color,'',g_x1,g_y1,g_y1m,g_y1s,'тыс.руб/чел.',m_data,last_img_131[cn-1],new_i);
            draw_graph_01(obj,'',      gr_add_data,'тыс.руб/чел.',m_data,last_img_131[cn-1],new_i);
            graw_point1(new_i,context,1,m_data,last_img_131[cn-1]);
        }
        else if(cn==2)
        {
            let gr_add_data={
                rect_color:  '#5ba1db',
                rect_Hcolor: '#8bc1fb',
                rect_HWidth: 10,
                in_data: gr_data2_131};
            //draw_graph_01(c,1,rect_color,'',g_x1,g_y1,g_y1m,g_y1s,'тыс.руб/чел.',m_data,last_img_131[cn-1],new_i);
            draw_graph_01(obj,'#00FF00',gr_add_data,'тыс.руб.',m_data,last_img_131[cn-1],new_i);
            graw_point1(new_i,context,1,m_data,last_img_131[cn-1]);
        }
    }
    active_i_131=new_i;

    
}