
var act_000=0;

let rz_timer111_refr=0;
/*let rz_last_time111=0;*/
let gr_data1_111=[];
let gr_data1p_111=[];

let gr_data31_131;
let gr_data32_131;
let gr_data33_131;

let gr_data3p_131;

let gr_data2_141;
let gr_data41_141;
let gr_data42_141;
let gr_data2p_141;
let gr_data4p_141;


let last_time_G=0;

let timer111_last=0;
let active_i_111=-1;
/*let last_img_111=0;*/

let timer131_last=0;
let active_i_131=-1;
/*let last_img_131=0;
*/
let timer141_last=0;
//let active_i_141=-1;
let active_i_141={tp:-1,nn:-1,xn:-1};
/*let last_img_141=0;*/


let DGRM_params=[];
let DGRM_param={Z:1,A:0,B:0};


function draw_graph_01(c,Pn,avg_color,m_data,y_ax_name,gr_data1p01,snap_img,xH)
{
    if(!c){return;}

    var context = c.getContext("2d");

    let Z=DGRM_params[Pn].Z*2; // zoom;
    let ww=1000;
    let hh=700;
    let pdx=20*Z; //рамка сбоку (px)
    let pdyp=0.25; //рамка сверху (%)
    let px0=20*Z; //первый отступ (px)
    let fp=0.65; //наполнение столбца по ширине (%)
    let axisX_h=0.1; //высота оси X (%)
    let axisX_hp=40*Z; //80; //высота оси X (px)

    let h_name=60;//высота надписи от верхнего края (px)
    let h_AL=30; //размер буквы у надписи h

    //let xx1=c.width;
    //let xx2=c.style.width;
    //c.width=ww;
    //c.height=hh;

    let A=DGRM_params[Pn].A*c.clientWidth; // смещение по X
    let B=DGRM_params[Pn].B*c.clientHeight; // смещение по Y
    ww=c.clientWidth/2*Z;  // *2;
    hh=c.clientHeight/2*Z; // *2;
    let c_new=1;
    if(xH<0)
    {
        c_new=1;
    }
    else
    {
        c_new=0;
    }
    if(c_new==1 || m_data.in_data === undefined)
    {
        //c.width=ww;
        //c.height=hh;
        context.clearRect(A, B, ww, hh);
    }

    context.strokeStyle = "#2233EE"; //"#FFEE22";
    context.lineWidth=3*Z;//5;
    context.lineJoin="round";
    ///ctx.beginPath();
    ///ctx.arc(m_data.px[nx],m_data.py[nx][ny],10,2*Math.PI,false);
    ///ctx.stroke();
    var sa= 5*Z;
    var sr=10*Z;
    context.beginPath();
    context.moveTo(A+ 0+sa+sr,B+ 0+sa);
    context.lineTo(A+ww-sa-sr,B+ 0+sa);
    //context.moveTo(ww-sa   , 0+sa+sr);
    context.arc(A+ww-sa-sr,B+0+sa+sr,sr,3/2*Math.PI, 2*Math.PI);
    context.lineTo(A+ww-sa   ,B+hh-sa-sr);
    //context.moveTo(ww-sa-sr,hh-sa);
    context.arc(A+ww-sa-sr,B+hh-sa-sr,sr, 0, 1/2*Math.PI);
    context.lineTo(A+ 0+sa+sr,B+hh-sa);
    //context.moveTo( 0+sa   ,hh-sa-sr);
    context.arc(A+0+sa+sr,B+hh-sa-sr,sr, 1/2*Math.PI, 1*Math.PI);
    context.lineTo(A+ 0+sa   ,B+ 0+sa+sr);
    context.arc(A+0+sa+sr,B+0+sa+sr,sr, 1*Math.PI, 3/2*Math.PI);
    context.stroke();
    
    context.lineWidth=2*Z;
    context.strokeStyle = "#AAAAAA";
    context.fillStyle = "#fd961f";

    context.font = (10*Z)+"pt Arial"; //20
    //context.font = "20px Arial";
    context.textBaseline = "bottom";
    context.textAlign = "center";

    if(m_data.in_data === undefined)
    {
        context.textBaseline = "bottom";
        context.textAlign = "center";
        context.fillStyle = "#AAAAAA";
        context.font = (12*Z)+"pt Arial"; //26
        context.fillText("No data",A+ww*0.5,B+hh*0.7);
        return;
    }

    
    //let h_axisX=hh-(hh*axisX_h);
    let h_axisX=hh-axisX_hp;
    context.beginPath();
    context.moveTo(A+pdx,B+h_axisX);
    context.lineTo(A+ww-pdx,B+h_axisX);
    //context.lineTo(100,100);
    context.stroke();
    
    //let rect_color=m_data.rect_color;
    let m_y2=0;
    if(m_data.in_data.gr1_y2)
    {
        m_y2=1;
    }
    let g_x1 =m_data.in_data.gr1_x1;
    let g_y1 =m_data.in_data.gr1_y1;
    let g_y1m=m_data.in_data.gr1_y1m;
    let g_y1s=m_data.in_data.gr1_y1s;
    let g_y2 =0;
    let g_y2m=0;
    let g_y2s=0;
    if(m_y2==1)
    {
        g_y2 =m_data.in_data.gr1_y2;
        g_y2m=m_data.in_data.gr1_y2m;
        g_y2s=m_data.in_data.gr1_y2s;
    }
    else
    {
        g_y2 =m_data.in_data.gr1_y1;
        g_y2m=m_data.in_data.gr1_y1m;
        g_y2s=m_data.in_data.gr1_y1s;
    }
    
    
    let L=g_x1.length;
    let pdy=hh*pdyp;
    let ax=(ww-2.0*(pdx+px0))/((1-fp)/fp*(L-1)+L);
    let bx=ax*(1-fp)/2/fp;
    let x1=0;
    let x2=0;
    let y1=0;
    let y2=0;
    let vn=0.99;
    let v =(h_axisX-pdy)*vn;
    let v2=(h_axisX-pdy)*vn;
    //context.fillRect(pdx+px0,h_axisX-v,200,v);
    let v_max=0;
    if(L>0)
    {
        v_max=g_y1m[0];
    }

    let LL_x1=0;
    let LL_y1=0;
    let LL_y2=0;
    for(let j=0;j<L;j++)
    {
        LL_x1=LL_x1+g_x1[j].length;
        LL_y1=LL_y1+g_y1s[j].length;
        LL_y2=LL_y2+g_y2s[j].length;
    }
    
    context.lineWidth=1*Z;

    let sx1=0;
    let sx2=0;

    let x1_AL=7*Z; //14; //размер буквы у надписи x1
    let y1_AL=8*Z; //15; //размер буквы у надписи y1
    let y2_AL=8*Z; //15; //размер буквы у надписи y1

    let x1_sL=LL_x1/L*x1_AL; //длина надписи x1
    let x1_pos=0; //текущее окончание надписи x1
    let y1_sL=LL_y1/L*y1_AL; //длина надписи x1
    let y1_pos=0; //текущее окончание надписи x1
    let y2_sL=LL_y2/L*y2_AL; //длина надписи x1
    let y2_pos=0; //текущее окончание надписи x1
    let v_old=0;  // высота надписи прошлого столбика
    let v_old2=0; // высота надписи2 прошлого столбика
    let txt_x=[];
    let txt_y=[];
    let txt_s=[];
    let txt2_x=[];
    let txt2_y=[];
    let txt2_s=[];
    gr_data1p01.px1=[];
    gr_data1p01.px2=[];
    gr_data1p01.py1=[];
    gr_data1p01.py2=[];
    gr_data1p01.pys=[];
    let last_str1=-1;

    let gradient;
    //gradient.addColorStop(0,"#111111");
    //gradient.addColorStop(1,rect_color);

    context.lineJoin = 'round';
    
    for(let i=0;i<L;i++)
    {
        if(i==0)
        {
            sx1=pdx+px0;
        }
        else
        {
            sx1=sx2+2*bx;
        }
        sx2=sx1+ax;
        v_old=v;
        v_old2=v2;
        v =(h_axisX-pdy)*g_y1[i]/v_max;
        v2=(h_axisX-pdy)*g_y2[i]/v_max;
        if(i==xH)
        {
            context.fillStyle = m_data.rect_Hcolor;
        }
        else
        {
            context.fillStyle = m_data.rect_color;
        }
        context.fillRect(A+sx1,B+h_axisX-v,ax,v);

        /*if(i==0)
        {
            context.lineWidth=ax*0.02;
            if(context.lineWidth<10)
            {
                context.lineWidth=10;
            }
        }*/
        if(m_y2==1)
        {
            let dv=v-v2;
            if(dv>ax*0.2+20*Z)
            {
                dv=ax*0.2+20*Z;
            }
            gradient = context.createLinearGradient(A+0,B+h_axisX-v2,A+0,B+h_axisX-v2-dv);
            if(i==xH)
            {
                //context.fillStyle = m_data.rect2_Hcolor;
                //context.strokeStyle = m_data.rect2_Hcolor;
                gradient.addColorStop(0,"#111111");
                gradient.addColorStop(1,m_data.rect_Hcolor);
            }
            else
            {
                //context.fillStyle = m_data.rect2_color;
                //context.strokeStyle = m_data.rect2_color;
                gradient.addColorStop(0,"#111111");
                gradient.addColorStop(1,m_data.rect_color);
            }
            context.fillStyle = gradient;
            
            context.fillRect(A+sx1,B+h_axisX-v2-dv,ax,dv);
        }
        /*
        let v2_b = h_axisX-v2+ax*0.1;
        if(v2_b>h_axisX)
        {
            v2_b=h_axisX;
        }
        //context.fillRect(sx1+ax*0.1,h_axisX-v2,ax*0.8,ax*0.05);
        context.beginPath();
        context.moveTo(sx1+ax*0.05,v2_b);
        context.lineTo(sx1+ax*0.1,h_axisX-v2);
        context.lineTo(sx1+ax*0.9,h_axisX-v2);
        context.lineTo(sx1+ax*0.95,v2_b);
        context.stroke();
        */
        

        gr_data1p01.px1[i]=A+sx1;
        gr_data1p01.px2[i]=A+sx1+ax;
        gr_data1p01.py1[i]=B+h_axisX-v;
        gr_data1p01.py2[i]=B+h_axisX;
        gr_data1p01.pys[i]=g_x1[i];
        
        //context.fillStyle = "#FFFFFF";
        if(xH<0)
        {
            context.fillStyle = "#FFFFFF";
        }
        else
        {
            context.fillStyle = "#999999";
        }

        if(sx1+ax/2-x1_sL/2>x1_pos)
        {
            if(i!=xH)
            {
                context.fillText(g_x1[i],A+sx1+ax/2,B+h_axisX+20*Z); // +40
            }
            x1_pos=sx1+ax/2+x1_sL/2;
        }
        if(i==xH)
        {
            last_str1=sx1+ax/2;
        }

        if(sx1+ax/2-y1_sL/2>y1_pos||g_y1[i]>=v_max)
        {
            txt_s[i]=g_y1s[i];
            txt_x[i]=sx1+ax/2;
            txt_y[i]=h_axisX-v-10*Z;
            //let vs=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(rr.y1[i]));
            ///context.fillText(g_y1s[i],sx1+ax/2,h_axisX-v-10);
            y1_pos=sx1+ax/2+y1_sL/2;
            //context.strokeStyle = "#FFFFFF";
            //context.strokeText(rr.x1[i],sx1+ax/2,h_axisX+40);
        }
        else if(sx1+ax/2-y1_sL/2>y1_pos-y1_sL&&Math.abs(v_old-v)>y1_AL)
        {
            txt_s[i]=g_y1s[i];
            txt_x[i]=sx1+ax/2;
            txt_y[i]=h_axisX-v-10*Z;
            ///context.fillText(g_y1s[i],sx1+ax/2,h_axisX-v-10);
            y1_pos=sx1+ax/2+y1_sL/2;
        }
        else
        {
            txt_s[i]="";
            txt_x[i]=0;
            txt_y[i]=0;
        }
        if(m_y2==1)
        {
            if(sx1+ax/2-y2_sL/2>y2_pos||g_y2[i]>=v_max)
            {
                txt2_s[i]=g_y2s[i];
                txt2_x[i]=sx1+ax/2;
                txt2_y[i]=h_axisX-v2+20*Z; //+40;
                //let vs=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(rr.y1[i]));
                ///context.fillText(g_y1s[i],sx1+ax/2,h_axisX-v-10);
                y2_pos=sx1+ax/2+y2_sL/2;
                //context.strokeStyle = "#FFFFFF";
                //context.strokeText(rr.x1[i],sx1+ax/2,h_axisX+40);
            }
            else if(sx1+ax/2-y2_sL/2>y2_pos-y2_sL&&Math.abs(v_old2-v2)>y2_AL)
            {
                txt2_s[i]=g_y2s[i];
                txt2_x[i]=sx1+ax/2;
                txt2_y[i]=h_axisX-v2+20*Z; //+40;
                ///context.fillText(g_y1s[i],sx1+ax/2,h_axisX-v-10);
                y2_pos=sx1+ax/2+y2_sL/2;
            }
            else
            {
                txt2_s[i]="";
                txt2_x[i]=0;
                txt2_y[i]=0;
            }
        }
    }
    context.stroke();

    if(avg_color!="")
    {
        let xi  =0;
        let sx__=0;
        let sy__=0;
        let sxy__=0;
        let sx2__=0;
        let avg_a=0;
        let avg_b=0;
        for(let i=0;i<L;i++)
        {
            xi=i;
            sx__ =sx__ +i;//g_x1[i];
            sy__ =sy__ +g_y1[i];
            sxy__=sxy__+i*g_y1[i];
            sx2__=sx2__+i*i;
        }

        avg_a=(L*sxy__-sx__*sy__)/(L*sx2__-sx__*sx__);
        avg_b=(sy__-avg_a*sx__)/L;

        let xa1=pdx;//+px0+ax/2;
        let ddx=(px0+ax/2)/(ax+2*bx);
        v=(h_axisX-pdy)*(-avg_a*ddx+avg_b)/v_max;
        let ya1=v; //(h_axisX-pdy)*avg_b/v_max;
        let xa2=ww-(pdx); //-(pdx+px0+ax/2);
        v=(h_axisX-pdy)*(avg_a*(L-1+ddx)+avg_b)/v_max;
        let ya2=v;
        context.strokeStyle = avg_color;
        context.lineWidth=2*Z;
        context.beginPath();
        context.moveTo(A+xa1,B+h_axisX-ya1);
        context.lineTo(A+xa2,B+h_axisX-ya2);
        //context.lineTo(100,100);
        context.stroke();

        if(m_y2==1)
        {
            xi  =0;
            sx__=0;
            sy__=0;
            sxy__=0;
            sx2__=0;
            for(let i=0;i<L;i++)
            {
                xi=i;
                sx__ =sx__ +i;//g_x1[i];
                sy__ =sy__ +g_y2[i];
                sxy__=sxy__+i*g_y2[i];
                sx2__=sx2__+i*i;
            }

            avg_a=(L*sxy__-sx__*sy__)/(L*sx2__-sx__*sx__);
            avg_b=(sy__-avg_a*sx__)/L;

            v=(h_axisX-pdy)*(-avg_a*ddx+avg_b)/v_max;
            ya1=v; //(h_axisX-pdy)*avg_b/v_max;
            v=(h_axisX-pdy)*(avg_a*(L-1+ddx)+avg_b)/v_max;
            ya2=v;
            //context.lineJoin = 'round';
            context.strokeStyle = '#00FF00';
            context.lineWidth=2*Z;
            context.beginPath();
            context.moveTo(A+xa1,B+h_axisX-ya1);
            context.lineTo(A+xa2,B+h_axisX-ya2);
            //context.lineTo(100,100);
            context.stroke();
        }
        
    }
    for(let i=0;i<L;i++)
    {
        if(txt_s[i]!="" && i!=xH)
        {
            context.fillText(txt_s[i],A+txt_x[i],B+txt_y[i]);
        }
        if(m_y2==1)
        {
            if(txt2_s[i]!="" && i!=xH)
            {
                context.fillText(txt2_s[i],A+txt2_x[i],B+txt2_y[i]);
            }
        }
    }

    if(last_str1>=0)
    {
        context.fillStyle = "rgba(45,51,77,0.9)";
        context.fillRect(A+last_str1-x1_sL/2-5*Z,B+h_axisX+2*Z,x1_sL+10*Z,19*Z);
        context.fillRect(A+last_str1-y1_sL/2-5*Z,B+txt_y[xH]-17*Z,y1_sL+10*Z,16*Z);
        context.font = (10*Z)+"pt Arial"; // 24
        context.fillStyle = "#FFFFFF"; m_data.rect_Hcolor;
        context.fillText(m_data.in_data.gr1_x1[xH],A+last_str1,B+h_axisX+20*Z); // +40;
        context.fillText(txt_s[xH],A+txt_x[xH],B+txt_y[xH]);
        if(m_y2==1)
        {
            context.font = (10*Z)+"pt Arial"; // 20
            context.fillStyle = "#AA0000"
            context.fillText(txt2_s[xH],A+txt2_x[xH],B+txt2_y[xH]);
        }
    }

    if(c_new==1)
    {
        context.fillStyle = "#FFFFFF";
        context.font = (10*Z)+"pt Arial"; // 20
        context.textBaseline = "bottom";
        context.textAlign = "right";
        context.fillText(y_ax_name,A+ww-pdx,B+hh-6*Z);
    }

    if(xH<0)
    {
        snap_img.data=context.getImageData(A,B,ww,hh);
    }
    return;
    
}

function draw_graph_03(c,Pn,m_data,y_ax_name,gr_data1p01,snap_img,cn,xH)
{
    if(!c)
    {
        return;
    }

    var context = c.getContext("2d");

    let Z=DGRM_params[Pn].Z; // zoom;
    let ww=1000;
    let hh=700;
    let pdx=20*Z; //рамка сбоку (px)
    let pdyp=0.25; //рамка сверху (%)
    let px0_1=25+50*Z; //первый отступ слева (px)
    let px0_2=25; //первый отступ справа(px)
    //let px0=px0_1+px0_2; //первый отступ (px)
    let fp=1;///0.65; //наполнение столбца по ширине (%)
    let axisX_h=0.1; //высота оси X (%)
    let axisX_hp=80*Z; //высота оси X (px)

    let h_name=60;//высота надписи от верхнего края (px)
    let h_AL=30; //размер буквы у надписи h

    let ms=10*Z; //размер маркера

    //let xx1=c.width;
    //let xx2=c.style.width;
    //c.width=ww;
    //c.height=hh;

    let A=DGRM_params[Pn].A*c.clientWidth; // смещение по X
    let B=DGRM_params[Pn].B*c.clientHeight; // смещение по Y
    ww=c.clientWidth*Z;
    hh=c.clientHeight*Z;
    let c_new=1;
    if(cn<0)
    {
        c_new=1;
    }
    else
    {
        c_new=0;
    }
    if(c_new==1 || m_data.in_data === undefined)
    {
        //c.width=ww;
        //c.height=hh;
        context.clearRect(A, B, ww, hh);
    }

    var sa=10*Z;
    var sr=20*Z;

    context.lineWidth=5*Z;
    context.strokeStyle = "#AAAAAA";
    context.fillStyle = "#fd961f";

    if(m_data.in_data === undefined)
    {
        context.textBaseline = "bottom";
        context.textAlign = "center";
        context.fillStyle = "#AAAAAA";
        context.font = (26*Z)+"pt Arial";
        context.fillText("No data",A+ww*0.5,B+hh*0.7);
        return;
    }

    
    
    //let h_axisX=hh-(hh*axisX_h);
    let h_axisX=hh-axisX_hp;    
    
    let L=m_data.in_data[0].gr1_x1.length;
    let K=m_data.in_data.length;
    let pdy=hh*pdyp;
    ///let ax=(ww-2.0*(pdx+px0))/((1-fp)/fp*(L-1)+L);
    ///let bx=ax*(1-fp)/2/fp;
    let ax=0;
    let bx=(ww-2.0*pdx-px0_1-px0_2)/(L-1)/2.0;
    let x1=0;
    let x2=0;
    let y1=0;
    let y2=0;
    let vn=0.99;
    let v=[]
    for(let j=act_000;j<K;j++)
    {
        v[j]=(h_axisX-pdy)*vn;
    }

    //context.fillRect(pdx+px0,h_axisX-v,200,v);
    let v_max=0;

    /*
    let gr_add_data={
        line_color:  [],
        point_color: [],
        in_data: []};
    gr_add_data.line_color[0]='#dd961f';
    gr_add_data.line_color[1]='#5bfb5b';
    gr_add_data.line_color[2]='#abfb5b';
    gr_add_data.point_color[0]='#FFFFFF';
    gr_add_data.point_color[1]='#dd961f';
    gr_add_data.point_color[2]='#dd961f';
    gr_add_data.in_data[0]=gr_data31_131;
    gr_add_data.in_data[1]=gr_data32_131;
    gr_add_data.in_data[2]=gr_data33_131;

    gr_data31_131.gr1_x1,gr_data31_131.gr1_y1,max_y,gr_data31_131.gr1_y1s
*/
    let v_max_n=0;
    if(L>0)
    {
        v_max = m_data.in_data[0].gr1_y1m[0];
        for(let j=1;j<K;j++)
        {
            if(m_data.in_data[j].gr1_x1.length>0)
            {
                if(v_max < m_data.in_data[j].gr1_y1m[0])
                {
                    v_max = m_data.in_data[j].gr1_y1m[0];
                    v_max_n=j;
                }
            }
        }
    }
    

    let LL_x1=0;
    let LL_y1=[];
    for(let i=0;i<L;i++)
    {
        LL_x1   =LL_x1+m_data.in_data[0].gr1_x1[i].length;
        for(let j=0;j<K;j++)
        {
            LL_y1[j]=LL_y1[j]+m_data.in_data[j].gr1_y1s[i].length;
        }
    }
    
    
/*
    for(let i=0;i<L;i++)
    {
        if(i==0)
        {
            v_max=g_y1[i];
        }
        else
        {
            if(rr.y1[i]>v_max)
            {
                v_max=rr.y1[i];
            }
        }
    }
    */

    context.lineWidth=6;
    //context.strokeStyle = line_color;
    let sx1=0;
    let sx2=0;
    let sx1_old=0; //X у прошлой точки

    let x1_AL=14*Z; //размер буквы у надписи x1
    let y1_AL=15*Z; //размер буквы у надписи y1

    let x1_sL=LL_x1/L*x1_AL; //длина надписи x1
    let x1_pos=0; //текущее окончание надписи x1
    let y1_sL=LL_y1[0]/L*y1_AL; //длина надписи x1
    let y1_pos=0; //текущее окончание надписи x1
    //let v_old=[]; // высота надписи прошлого столбика
    let mark_buff_x =[];
    let mark_buff_y =[];
    context.fillStyle = "#FFFFFF";
    let mmy=0;
    let my =0;

    if(c_new==0)
    {
        context.clearRect(A+ 0,B+ h_axisX,ww,hh-h_axisX);
    }

    context.strokeStyle = "#2233EE"; //"#FFEE22";
    context.lineWidth=5*Z;//5;
    context.lineJoin="round";

    context.beginPath();
    context.moveTo(A+ 0+sa+sr,B+ 0+sa);
    context.lineTo(A+ww-sa-sr,B+ 0+sa);
    //context.moveTo(ww-sa   , 0+sa+sr);
    context.arc(A+ww-sa-sr,B+0+sa+sr,sr,3/2*Math.PI, 2*Math.PI);
    context.lineTo(A+ww-sa   ,B+hh-sa-sr);
    //context.moveTo(ww-sa-sr,hh-sa);
    context.arc(A+ww-sa-sr,B+hh-sa-sr,sr, 0, 1/2*Math.PI);
    context.lineTo(A+ 0+sa+sr,B+hh-sa);
    //context.moveTo( 0+sa   ,hh-sa-sr);
    context.arc(A+0+sa+sr,B+hh-sa-sr,sr, 1/2*Math.PI, 1*Math.PI);
    context.lineTo(A+ 0+sa   ,B+ 0+sa+sr);
    context.arc(A+0+sa+sr,B+0+sa+sr,sr, 1*Math.PI, 3/2*Math.PI);
    context.stroke();

    if(c_new==1)
    {
        context.lineWidth=5*Z;
        context.strokeStyle = "#AAAAAA";
        context.font = (20*Z)+"pt Arial";
        //context.font = "20px Arial";
        context.textBaseline = "bottom";
        context.textAlign = "left";

        context.beginPath();
        context.moveTo(A+ pdx,B+ h_axisX);
        context.lineTo(A+ ww-pdx,B+ h_axisX);
        //context.lineTo(100,100);
        context.stroke();
        
        let const1=5;
        //let const2=1.1;
        let r1=v_max/const1;
        let r2=Math.log10(r1);
        let r3=Math.floor(r2);
        let r4=r1/Math.pow(10,r3);
        let r5=Math.ceil(r4);
        let r6=r5*Math.pow(10,r3);
        let mys=0;
        for(let j=0;j<100; j++)
        {
            my=r6*j;
            mmy=h_axisX-(h_axisX-pdy)*my/v_max;
            context.fillRect(A+ 10*Z,B+ mmy-2*Z,20*Z,4*Z);
            context.fillText(my,A+ 10*Z +10*Z ,B+ mmy-6*Z);
            if(my>v_max)
            {
                break;
            }
        }
    }
    else
    {
        //context.clearRect(A+ 0,B+ h_axisX,ww,hh-h_axisX);
        context.lineWidth=5*Z;
        context.strokeStyle = "#AAAAAA";
        context.font = (20*Z)+"pt Arial";
        //context.font = "20px Arial";
        context.textBaseline = "bottom";
        context.textAlign = "left";

        context.beginPath();
        context.moveTo(A+ pdx,B+ h_axisX);
        context.lineTo(A+ ww-pdx,B+ h_axisX);
        //context.lineTo(100,100);
        context.stroke();
    }

    context.font = (20*Z)+"pt Arial";
    //context.font = "20px Arial";
    context.textBaseline = "bottom";
    context.textAlign = "center";
    context.lineWidth=6*Z;
    //context.strokeStyle = line_color;

    //v_old[0]=0;
    //v_old[1]=0;
    //v_old[2]=0;
    gr_data1p01.px=[];
    gr_data1p01.py=[];
    gr_data1p01.pyn=[];
    gr_data1p01.pys=[];
    let last_str1=-1;

    for(let i=0;i<L;i++)
    {
        sx1_old=sx1;
        //v_old[0]=v[0];
        //v_old[1]=v[1];
        //v_old[2]=v[2];
        if(i==0)
        {
            sx1=pdx+px0_1;
        }
        else
        {
            sx1=sx2+2*bx;
        }
        sx2=sx1+ax;

        gr_data1p01.px[i]=A+ sx1;
        let py_=[];
        let pyn=[];
        let pys_=[];

        for(let j=0;j<K;j++)
        {
            if(m_data.in_data[j].gr1_y1[i]==-1000000000)
            {
                pyn[j]=0;
            }
            else
            {
                v[j]=(h_axisX-pdy)*m_data.in_data[j].gr1_y1[i]/v_max;
                py_[j]=B+ h_axisX-v[j];
                pyn[j]=1;
                pys_[j]=m_data.in_data[j].gr1_y1s[i];
            }
        }
        gr_data1p01.py[i]=py_;
        gr_data1p01.pyn[i]=pyn;
        gr_data1p01.pys[i]=pys_;


        //context.fillStyle = line_color;
        //context.fillRect(sx1,h_axisX-v,ax,v);
        /*
        if(i==0)
        {
            context.beginPath();
            context.moveTo(sx1,h_axisX-v);
            //context.lineTo(50,50);
            
        }
        else
        {
            context.lineTo(sx1,h_axisX-v);
        }
        */
        //mark_buff_x[i]=sx1+ax/2.0-ms/2;
        //mark_buff_y[i]=h_axisX-v-ms/2;
        
        ///context.fillStyle = mark_color;
        ///context.fillRect(sx1+ax/2.0-ms/2,h_axisX-v-ms/2,ms,ms);



        if(i!=xH-1000)
        {
            if(xH<0)
            {
                context.fillStyle = "#FFFFFF";
            }
            else
            {
                context.fillStyle = "#999999";
            }
            if(sx1+ax/2-x1_sL/2>x1_pos)
            {
                context.fillText(m_data.in_data[0].gr1_x1[i],A+ sx1+ax/2,B+ h_axisX+40*Z);
                x1_pos=sx1+ax/2+x1_sL/2;
            }
        }
        if(i==xH)
        {
            last_str1=sx1+ax/2;
            /*
            context.fillStyle = "rgba(45,51,77,0.9)";
            context.fillRect(sx1+ax/2-x1_sL/2-10,h_axisX+2,x1_sL+20,38);
            context.fillStyle = m_data.line_Hcolor[cn];
            context.fillText(m_data.in_data[0].gr1_x1[i],sx1+ax/2,h_axisX+40);
            if(sx1+ax/2-x1_sL/2>x1_pos)
            {
                x1_pos=sx1+ax/2+x1_sL/2;
            }*/
            /*
            if(sx1+ax/2-x1_sL/2>x1_pos)
            {
                context.fillText(m_data.in_data[0].gr1_x1[i],sx1+ax/2,h_axisX+40);
                x1_pos=sx1+ax/2+x1_sL/2;
            }
            */
        }

        /*
        if(sx1+ax/2-y1_sL/2>y1_pos||g_y1[i]>=v_max)
        {
            //let vs=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(rr.y1[i]));
            context.fillText(g_y1s[i],sx1+ax/2,h_axisX-v-10);
            y1_pos=sx1+ax/2+y1_sL/2;
            //context.strokeStyle = "#FFFFFF";
            //context.strokeText(rr.x1[i],sx1+ax/2,h_axisX+40);
        }
        else if(sx1+ax/2-y1_sL/2>y1_pos-y1_sL&&Math.abs(v_old-v)>y1_AL)
        {
            context.fillText(g_y1s[i],sx1+ax/2,h_axisX-v-10);
            y1_pos=sx1+ax/2+y1_sL/2;
        }
        */
    }
    context.stroke();
    if(last_str1>=0)
    {
        context.fillStyle = "rgba(45,51,77,0.9)";
        context.fillRect(A+ last_str1-x1_sL/2-10*Z,B+ h_axisX+2*Z,x1_sL+20*Z,38*Z);
        context.fillStyle = m_data.line_Hcolor[cn];
        context.fillText(m_data.in_data[0].gr1_x1[xH],A+ last_str1,B+ h_axisX+40*Z);
    }

    if(cn<0)
    {
        for(let j=0;j<3;j++)
        {
            context.lineWidth   = m_data.line_Width[j];
            context.strokeStyle = m_data.line_color[j];
            //context.setLineDash([5,5]);
            let start=0;
            for(let i=0;i<L;i++)
            {
                if(i==0)
                {
                    if(gr_data1p01.pyn[i][j]==1)
                    {
                        context.setLineDash([5*Z,0]);
                        start=1;
                        context.beginPath();
                        context.moveTo(gr_data1p01.px[i],gr_data1p01.py[i][j]);
                        //context.lineTo(50,50);
                    }
                }
                else
                {
                    if(gr_data1p01.pyn[i][j]==1)
                    {
                        if(gr_data1p01.pyn[i-1][j]==0)
                        {
                            if(start==1)
                            {
                                context.setLineDash([5*Z,8*Z]);
                                context.lineTo(gr_data1p01.px[i],gr_data1p01.py[i][j]);
                                context.stroke();
                            }
                            start=1;
                            context.beginPath();
                            context.moveTo(gr_data1p01.px[i],gr_data1p01.py[i][j]);
                            context.setLineDash([5*Z,0]);
                        }
                        else
                        {
                            context.lineTo(gr_data1p01.px[i],gr_data1p01.py[i][j]);
                        }
                    }
                    else
                    {
                        if(gr_data1p01.pyn[i-1][j]==1)
                        {
                            context.setLineDash([5*Z,0]);
                            context.stroke();
                        }
                    }
                }
            }
            context.setLineDash([5*Z,0]);
            context.stroke();

            context.fillStyle = m_data.point_color[j];
            for(let i=0;i<L;i++)
            {
                if(gr_data1p01.pyn[i][j]==1)
                {
                    context.fillRect(gr_data1p01.px[i]-ms/2,gr_data1p01.py[i][j]-ms/2,ms,ms);
                }
            }
        }
    }
    if(cn>=0)
    {
        let j=cn
        //context.fillStyle = "#AAAAAA";
        context.textAlign = "center";
        context.lineWidth   = m_data.line_HWidth[j];
        context.strokeStyle = m_data.line_Hcolor[j];
        let start=0;
        for(let i=0;i<L;i++)
        {
            if(i==0)
            {
                if(gr_data1p01.pyn[i][j]==1)
                {
                    context.setLineDash([5*Z,0]);
                    start=1;
                    context.beginPath();
                    context.moveTo(gr_data1p01.px[i],gr_data1p01.py[i][j]);
                    //context.lineTo(50,50);
                }
            }
            else
            {
                if(gr_data1p01.pyn[i][j]==1)
                {
                    if(gr_data1p01.pyn[i-1][j]==0)
                    {
                        if(start==1)
                        {
                            context.setLineDash([5*Z,8*Z]);
                            context.lineTo(gr_data1p01.px[i],gr_data1p01.py[i][j]);
                            context.stroke();
                        }
                        start=1;
                        context.beginPath();
                        context.moveTo(gr_data1p01.px[i],gr_data1p01.py[i][j]);
                        context.setLineDash([5*Z,0]);
                    }
                    else
                    {
                        context.lineTo(gr_data1p01.px[i],gr_data1p01.py[i][j]);
                    }
                }
                else
                {
                    if(gr_data1p01.pyn[i-1][j]==1)
                    {
                        context.setLineDash([5*Z,0]);
                        context.stroke();
                    }
                }
            }
        }
        context.stroke();

        context.fillStyle = m_data.point_color[j];
        for(let i=0;i<L;i++)
        {
            if(gr_data1p01.pyn[i][j]==1)
            {
                context.fillRect(gr_data1p01.px[i]-ms/2,gr_data1p01.py[i][j]-ms/2,ms,ms);
                if(i!=xH)
                {
                    let o=context.measureText(gr_data1p01.pys[i][cn]);
                    let wt=o.width;
                    context.fillStyle = "rgba(5,5,5,0.5)";
                    context.fillRect(gr_data1p01.px[i]-wt/2-5*Z,gr_data1p01.py[i][cn]-45*Z,wt+10*Z,35*Z);
                    context.fillStyle = "#AAAAAA";
                    context.fillText(gr_data1p01.pys[i][cn],gr_data1p01.px[i],gr_data1p01.py[i][cn]-15*Z);
                }
            }
        }
    }

    if(c_new!=1000)
    {
        context.fillStyle = "#FFFFFF";
        context.font = (20*Z)+"pt Arial";
        context.textBaseline = "bottom";
        context.textAlign = "right";
        context.fillText(y_ax_name,A+ ww-pdx,B+ hh-12*Z);
    }
    if(cn<0)
    {
        snap_img.data=context.getImageData(A,B,ww,hh);
    }
    return;
    /*
    context.fillStyle = "#FFFFFF";
    context.textBaseline = "bottom";
    context.textAlign = "center";
    let h_str="";
    if(nc==1)
    {
        h_str="Доходы";
    }
    else if(nc==2)
    {
        h_str="Расходы";
    } 
    h_str=h_str+" "+m131_h_name;
    let h_L=h_str.length;
    let HX = h_L*h_AL/ww*2;
    let sHX=20;
    if(HX>1)
    {
        //let rHX=Math.round(HX);
        HX=HX/2;
        sHX=Math.round(h_AL/HX);
    }
    else
    {
        sHX=h_AL;
    }
    context.font = sHX+"pt Arial";
    context.fillText(h_str,ww/2,h_name);
    */
}

function get_active1_i(x,y,GR_data1)
{
    let xs=10;
    let ys=10;
    let L=GR_data1.px1.length;
    if(L<=0){return -1;}
    for(let i=0; i<L; i++)
    {
        if(GR_data1.px1[i]-x<=xs && GR_data1.px2[i]-x>=-xs && GR_data1.py1[i]-y<=ys && GR_data1.py2[i]-y>=-ys)
        {
            return i;
        }
    }
    return -1;
}

function get_active2_i(x,y,GR_data1)
{
    let xs=30;
    let ys=30;
    let L=GR_data1.px.length;
    if(L<=0){return -1;}
    let M=3; //GR_data1.py[0].length;
    let p=-1000000;
    for(let i=0; i<L; i++)
    {
        if(Math.abs(x-GR_data1.px[i])<=xs)
        {
            for(let j=0;j<M;j++)
            {
                p=-1000000;
                try{
                    p=GR_data1.py[i][j];
                }
                catch(E)
                {p=-1000000;}
                if(Math.abs(y-p)<=ys)
                {
                    return i+j/100;
                }
            }
        }
    }
    return -1;
}

function get_active4_i(x,y,GR_data1)
{
    let ret={tp:-1,nn:-1,xn:-1};
    let xs=10;
    let ys=10;
    let K=GR_data1.length;
    for(let j=K-1; j>=0; j=j-1)
    {
        let L=GR_data1[j].px1.length;
        if(L>0)
        {
            for(let i=0; i<L; i++)
            {
                if(GR_data1[j].px1[i]-x<=xs && GR_data1[j].px2[i]-x>=-xs && GR_data1[j].py1[i]-y<=ys && GR_data1[j].py2[i]-y>=-ys)
                {
                    if(GR_data1[j].px1[i]==GR_data1[j].px2[i] && GR_data1[j].py1[i]==GR_data1[j].py2[i])
                    {
                        ret.tp=2;
                    }
                    else
                    {
                        ret.tp=1;
                    }
                    ret.nn=j;
                    ret.xn=i;
                    return ret;
                }
            }
        }
    }
    return ret;
}

function get_active5_i(x,y,GR_data1) // Для кругов
{
    //let ret={tp:3,nn:0,xn:1};
    let ret={tp:-1,nn:-1,xn:-1};
    let xs=10;
    let ys=10;
    let dx=0;
    let dy=0;
    let dr=0;
    let K=GR_data1.length;
    let pp=2.0*Math.PI; 
    for(let j=K-1; j>=0; j=j-1)
    {
        dx=x-GR_data1[j].pcx;
        dy=y-GR_data1[j].pcy;
        dr=Math.sqrt(dx*dx+dy*dy);
        if(dr>=GR_data1[j].r1-10 && dr<=GR_data1[j].r2+10)
        {
            if(dr>0)
            {
                let u=Math.asin(dy/dr);
                let uu=0;
                if(dx>=0)
                {
                    uu=u;
                }
                else
                {
                    uu=pp/2-u;
                }
                uu=uu/pp;
                let L=GR_data1[j].data_c1.length;
                for(let i=0;i<L;i++)
                {
                    if(uu>=GR_data1[j].data_c1[i] && uu<=GR_data1[j].data_c2[i])
                    {
                        ret.tp=3;
                        ret.nn=j;
                        ret.xn=i;
                        return ret;
                    }
                }
            }
        }
        let LL=GR_data1[j].data_l_x1.length;
        for(let i=0; i<LL; i++)
        {
            if(GR_data1[j].data_l_x1[i]-x<=xs && GR_data1[j].data_l_x2[i]-x>=-xs && GR_data1[j].data_l_y1[i]-y<=ys && GR_data1[j].data_l_y2[i]-y>=-ys)
            {
                ret.tp=3;
                ret.nn=j;
                ret.xn=i;
                return ret;
            }
        }
    }    
    return ret;
}

function get_HNxn(NH,n)
{
    if(NH.nn==n)
    {
        return NH.xn;
    }
    return -1;
}

function graw_point1(i,obj,Pn,m,m_data,last_img_obj)
{
    //ctx.clearRect(GR_data1_x[i]-58,GR_data1_y[i]-37,116,39);
    let nx=i; //Math.floor(i);
    //let ny=Math.round((i-nx)*100);
    var ctx = obj.getContext("2d");
    ctx.textAlign = "center";
    //ctx.lineJoin = 'round';
    
    let Z=DGRM_params[Pn].Z*2;
    let A=DGRM_params[Pn].A*obj.clientWidth;
    let B=DGRM_params[Pn].B*obj.clientHeight;

    let sa=3*Z; //5;
    let sb=20;

    if(m==0)
    {
        //ctx.font = "20pt Arial";
        //ctx.fillStyle = "#FFFFFF";
        //last_img_131[cn]=
        ///ctx.putImageData(last_img_obj.data,m_data.px1[nx]-sb,m_data.py1[nx]-sb);
        ctx.putImageData(last_img_obj.data,A,B);
    }
    if(m==1)
    {
        ///last_img_obj.data=ctx.getImageData(m_data.px1[nx]-sb,m_data.py1[nx]-sb,m_data.px2[nx]-m_data.px1[nx]+2*sb,m_data.py2[nx]-m_data.py1[nx]+2*sb);
        //ctx.font = "24pt Arial";
        //ctx.fillStyle = "#FFFF00";
        //ctx.clearRect(m_data.px[nx]-40,m_data.py[nx][ny]-45,80,35);
        ///let o=ctx.measureText(m_data.pys[nx][ny]);
        ///let wt=o.width;
        ///ctx.fillStyle = "rgba(5,5,5,0.5)";
        ///ctx.fillRect(m_data.px[nx]-wt/2-5,m_data.py[nx][ny]-45,wt+10,35);
        //ctx.fillStyle = "#55FF55";
        ctx.strokeStyle = "#22EE22"; //"#FFEE22";
        ctx.lineWidth=3*Z;//5;
        ctx.lineJoin="round";
        ///ctx.beginPath();
        ///ctx.arc(m_data.px[nx],m_data.py[nx][ny],10,2*Math.PI,false);
        ///ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(m_data.px1[nx]-sa,m_data.py1[nx]-sa);
        ctx.lineTo(m_data.px2[nx]+sa,m_data.py1[nx]-sa);
        ctx.lineTo(m_data.px2[nx]+sa,m_data.py2[nx]+sa);
        ctx.lineTo(m_data.px1[nx]-sa,m_data.py2[nx]+sa);
        ctx.lineTo(m_data.px1[nx]-sa,m_data.py1[nx]-sa);
        ctx.stroke();
        //ctx.strokeRect(m_data.px1[nx]-sa,m_data.py1[nx]-sa,m_data.px2[nx]-m_data.px1[nx]+2*sa,m_data.py2[nx]-m_data.py1[nx]+2*sa);
        ///ctx.fillStyle = "#FFFFFF";
        ///ctx.fillText(m_data.pys[nx][ny],m_data.px[nx],m_data.py[nx][ny]-11);
    }
    //ctx.fillText(GR_data1_s[i],GR_data1_x[i],GR_data1_y[i]);
}
function graw_point2(i,obj,Pn,m,m_data,last_img_obj)
{
    //ctx.clearRect(GR_data1_x[i]-58,GR_data1_y[i]-37,116,39);
    var ctx = obj.getContext("2d");

    let Z=DGRM_params[Pn].Z;
    let A=DGRM_params[Pn].A*obj.clientWidth;
    let B=DGRM_params[Pn].B*obj.clientHeight;

    let nx=Math.floor(i);
    let ny=Math.round((i-nx)*100);
    ctx.textAlign = "center";
    if(m==0)
    {
        //ctx.font = "20pt Arial";
        //ctx.fillStyle = "#FFFFFF";
        //last_img_131=
        ///ctx.putImageData(last_img_obj.data,m_data.px[nx]-60,m_data.py[nx][ny]-60);
        ctx.putImageData(last_img_obj.data,A,B);
    }
    if(m==1)
    {
        ///last_img_obj.data=ctx.getImageData(m_data.px[nx]-60,m_data.py[nx][ny]-60,120,120);
        
        //draw_graph_03(obj,gr_add_data,'тыс.руб.',gr_data3p_131,last_img_obj,ny);

        //ctx.font = "24pt Arial";
        //ctx.fillStyle = "#FFFF00";
        //ctx.clearRect(m_data.px[nx]-40,m_data.py[nx][ny]-45,80,35);
        let o=ctx.measureText(m_data.pys[nx][ny]);
        let wt=o.width;
        ctx.fillStyle = "rgba(5,5,5,0.5)";
        ctx.fillRect(m_data.px[nx]-wt/2-5*Z,m_data.py[nx][ny]-45*Z,wt+10*Z,35*Z);
        ctx.fillStyle = "#55FF55";
        ctx.beginPath();
        ctx.arc(m_data.px[nx],m_data.py[nx][ny],8*Z,2*Math.PI,false);
        ctx.stroke();
        //ctx.strokeRect(m_data.px[nx]-10,m_data.py[nx][ny]-10,20,20);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(m_data.pys[nx][ny],m_data.px[nx],m_data.py[nx][ny]-20*Z);
    }
    //ctx.fillText(GR_data1_s[i],GR_data1_x[i],GR_data1_y[i]);
}
function graw_point4(NH,obj,Pn,m,m_data,last_img_obj)
{
    //ctx.clearRect(GR_data1_x[i]-58,GR_data1_y[i]-37,116,39);
    var ctx = obj.getContext("2d");

    let Z=DGRM_params[Pn].Z;
    let A=DGRM_params[Pn].A*obj.clientWidth;
    let B=DGRM_params[Pn].B*obj.clientHeight;

    let nn=NH.nn;
    let nx=NH.xn; //Math.floor(i);
    //let ny=Math.round((i-nx)*100);
    ctx.textAlign = "center";
    let sa=5*Z;
    let sb=20;
    if(m==0)
    {
        //ctx.font = "20pt Arial";
        //ctx.fillStyle = "#FFFFFF";
        //last_img_131[cn]=
        ///ctx.putImageData(last_img_obj.data,m_data.px1[nx]-sb,m_data.py1[nx]-sb);
        ctx.putImageData(last_img_obj.data,A,B);
    }
    if(m==1)
    {
        if(NH.tp==1)
        {
            ctx.strokeStyle = "#22EE22"; //"#FFEE22";
            ctx.lineWidth=5*Z;
            ctx.lineJoin="round";
            ctx.beginPath();
            ctx.moveTo(m_data[nn].px1[nx]-sa,m_data[nn].py1[nx]-sa);
            ctx.lineTo(m_data[nn].px2[nx]+sa,m_data[nn].py1[nx]-sa);
            ctx.lineTo(m_data[nn].px2[nx]+sa,m_data[nn].py2[nx]+sa);
            ctx.lineTo(m_data[nn].px1[nx]-sa,m_data[nn].py2[nx]+sa);
            ctx.lineTo(m_data[nn].px1[nx]-sa,m_data[nn].py1[nx]-sa);
            ctx.stroke();
        }
        else if(NH.tp==2)
        {
            let o=ctx.measureText(m_data[nn].pys[nx]);
            let wt=o.width;
            ctx.fillStyle = "rgba(5,5,5,0.5)";
            ctx.fillRect(m_data[nn].px1[nx]-wt/2-5*Z,m_data[nn].py1[nx]-52*Z,wt+10*Z,35*Z);
            ctx.beginPath();
            ctx.fillStyle = "#55FF55";
            ctx.strokeStyle = "#222222";
            ctx.lineWidth=4*Z;
            ctx.arc(m_data[nn].px1[nx],m_data[nn].py1[nx],12*Z,2*Math.PI,false);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = "#55FF55";
            ctx.strokeStyle = "#55FF55";
            ctx.lineWidth=5*Z;
            ctx.arc(m_data[nn].px1[nx],m_data[nn].py1[nx],10*Z,2*Math.PI,false);
            ctx.stroke();
            ctx.closePath();
            //ctx.strokeRect(m_data.px[nx]-10,m_data.py[nx][ny]-10,20,20);
            ctx.fillStyle = "#FFFFFF";
            ctx.strokeStyle = "#FFFFFF";
            ctx.fillText(m_data[nn].pys[nx],m_data[nn].px1[nx],m_data[nn].py1[nx]-20*Z);
        }
    }
    //ctx.fillText(GR_data1_s[i],GR_data1_x[i],GR_data1_y[i]);
}
function copy_GR(gr_in,gr_out)
{
    let K=gr_in.length;
    for(let j=0;j<K;j++)
    {
        gr_out[j].mode=gr_in[j].mode;
        gr_out[j].color=gr_in[j].color;
        gr_out[j].Hcolor=gr_in[j].Hcolor;
        gr_out[j].HWidth=gr_in[j].HWidth;
        gr_out[j].gr_y1m=gr_in[j].gr_y1m;
        gr_out[j].avg_color=gr_in[j].avg_color;
        let L=gr_in[j].gr_x1.length;
        for(let i=0;i<L;i++)
        {
            gr_out[j].gr_x1[i]=gr_in[j].gr_x1[i];
            gr_out[j].gr_y1[i]=gr_in[j].gr_y1[i];
            gr_out[j].gr_y1s[i]=gr_in[j].gr_y1s[i];//Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr_out[j].gr_y1[i]));
        }
    }
}
function set_GR(gr_data_in,mode,color,Hcolor,HWidth,avg_color,gr_data_out)
{
    //let gr_obj
    let j=gr_data_out.length;
    gr_data_out[j].mode=mode;
    gr_data_out[j].color=color;
    gr_data_out[j].Hcolor=Hcolor;
    gr_data_out[j].HWidth=HWidth;
    gr_data_out[j].gr_y1m=gr_y1m;
    gr_data_out[j].avg_color=avg_color;
    let L=gr_data_in.gr_x1.length;
    for(let i=0;i<L;i++)
    {
        gr_data_out[j].gr_x1[i]=gr_data_in.gr_x1[i];
        gr_data_out[j].gr_y1[i]=gr_data_in.gr_y1[i];
        gr_data_out[j].gr_y1s[i]=gr_data_in.gr_y1s[i];//Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr_out[j].gr_y1[i]));
    }
}
function draw_graph_04(c,Pn,c_new,avg_color,m_data,y_ax_name,gr_data1p01,snap_img,Snap,xH) // rect
{
    if(!c){return;}

    var context = c.getContext("2d");

    let Z=DGRM_params[Pn].Z; // zoom;
    let ww=1000;
    let hh=700;
    let pdx=20*Z; //рамка сбоку (px)
    let pdyp=0.25; //рамка сверху (%)
    let px0=20; //первый отступ (px)
    let px0_1=m_data.px0_1*Z; //75; //первый отступ слева (px)
    let px0_2=m_data.px0_2*Z; //25; //первый отступ справа(px)
    let fp=m_data.fp; //0.65; //наполнение столбца по ширине (%)
    let axisX_h=0.1; //высота оси X (%)
    let axisX_hp=80*Z; //высота оси X (px)

    let h_name=60;//высота надписи от верхнего края (px)
    let h_AL=30; //размер буквы у надписи h


    let A=DGRM_params[Pn].A*c.clientWidth; // смещение по X
    let B=DGRM_params[Pn].B*c.clientHeight; // смещение по Y
    ww=c.clientWidth*Z;
    hh=c.clientHeight*Z;

    if(c_new==1 || m_data.in_data === undefined)
    {
        //c.width=ww;
        //c.height=hh;
        context.clearRect(A, B, ww, hh);
    }
    
    var sa=10*Z;
    var sr=20*Z;

    context.lineWidth=5*Z;
    context.strokeStyle = "#AAAAAA";
    context.fillStyle = "#fd961f";

    context.font = (20*Z)+"pt Arial";
    //context.font = "20px Arial";
    context.textBaseline = "bottom";
    context.textAlign = "center";

    if(m_data.in_data === undefined)
    {
        context.textBaseline = "bottom";
        context.textAlign = "center";
        context.fillStyle = "#AAAAAA";
        context.font = (26*Z)+"pt Arial";
        context.fillText("No data",A+ ww*0.5,B+ hh*0.7);
        return;
    }
    
    //let h_axisX=hh-(hh*axisX_h);
    let h_axisX=hh-axisX_hp;
    if(m_data.axis_X_color!='')
    {
        context.lineWidth=m_data.axis_X;
        context.strokeStyle = m_data.axis_X_color;
        context.beginPath();
        context.moveTo(A+ pdx,B+ h_axisX);
        context.lineTo(A+ ww-pdx,B+ h_axisX);
        //context.lineTo(100,100);
        context.stroke();
    }
    
    let rect_color=m_data.color;
    let g_x1 =m_data.in_data.gr_x1;
    let g_y1 =m_data.in_data.gr_y1;
    let g_y1s=m_data.in_data.gr_y1s;
    
    
    let L=g_x1.length;
    let pdy=hh*pdyp;

    let ax=(ww-2.0*pdx-px0_1-px0_2)/((1-fp)/fp*(L-1)+L);

    let bx=ax*(1-fp)/2/fp;
    let x1=0;
    let x2=0;
    let y1=0;
    let y2=0;
    let vn=0.99;
    let v=(h_axisX-pdy)*vn;
    //context.fillRect(pdx+px0,h_axisX-v,200,v);
    let v_max=0;
    if(L>0)
    {
        v_max=m_data.in_data.gr_y1m/m_data.yK;
    }

    let LL_x1=0;
    let LL_y1=0;
    for(let j=0;j<L;j++)
    {
        LL_x1=LL_x1+g_x1[j].length;
        LL_y1=LL_y1+g_y1s[j].length;
    }
    
    context.lineWidth=1;

    let sx1=0;
    let sx2=0;

    let x1_AL=14*Z; //размер буквы у надписи x1
    let y1_AL=15*Z; //размер буквы у надписи y1

    let x1_sL=LL_x1/L*x1_AL; //длина надписи x1
    let x1_pos=0; //текущее окончание надписи x1
    let y1_sL=LL_y1/L*y1_AL; //длина надписи x1
    let y1_pos=0; //текущее окончание надписи x1
    let v_old=0; // высота надписи прошлого столбика
    let txt_x=[];
    let txt_y=[];
    let txt_s=[];
    gr_data1p01.px1=[];
    gr_data1p01.px2=[];
    gr_data1p01.py1=[];
    gr_data1p01.py2=[];
    gr_data1p01.pys=[];
    let last_str1=-1;

    var sa=10*Z;
    var sr=20*Z;

    context.strokeStyle = "#2233EE"; //"#FFEE22";
    context.lineWidth=5*Z;//5;
    context.lineJoin="round";

    context.beginPath();
    context.moveTo(A+ 0+sa+sr,B+ 0+sa);
    context.lineTo(A+ww-sa-sr,B+ 0+sa);
    //context.moveTo(ww-sa   , 0+sa+sr);
    context.arc(A+ww-sa-sr,B+0+sa+sr,sr,3/2*Math.PI, 2*Math.PI);
    context.lineTo(A+ww-sa   ,B+hh-sa-sr);
    //context.moveTo(ww-sa-sr,hh-sa);
    context.arc(A+ww-sa-sr,B+hh-sa-sr,sr, 0, 1/2*Math.PI);
    context.lineTo(A+ 0+sa+sr,B+hh-sa);
    //context.moveTo( 0+sa   ,hh-sa-sr);
    context.arc(A+0+sa+sr,B+hh-sa-sr,sr, 1/2*Math.PI, 1*Math.PI);
    context.lineTo(A+ 0+sa   ,B+ 0+sa+sr);
    context.arc(A+0+sa+sr,B+0+sa+sr,sr, 1*Math.PI, 3/2*Math.PI);
    context.stroke();
    
    for(let i=0;i<L;i++)
    {
        if(i==0)
        {
            sx1=pdx+px0_1;
        }
        else
        {
            sx1=sx2+2*bx;
        }
        sx2=sx1+ax;
        v_old=v;
        v=(h_axisX-pdy)*g_y1[i]/v_max;
        if(i==xH)
        {
            context.fillStyle = m_data.Hcolor;
        }
        else
        {
            context.fillStyle = rect_color;
        }
        context.fillRect(A+ sx1,B+ h_axisX-v,ax,v);

        gr_data1p01.px1[i]=A+ sx1;
        gr_data1p01.px2[i]=A+ sx1+ax;
        gr_data1p01.py1[i]=B+ h_axisX-v;
        gr_data1p01.py2[i]=B+ h_axisX;
        gr_data1p01.pys[i]=g_x1[i];
        
        //context.fillStyle = "#FFFFFF";
        if(xH<0)
        {
            context.fillStyle = "#FFFFFF";
        }
        else
        {
            context.fillStyle = "#999999";
        }

        if(sx1+ax/2-x1_sL/2>x1_pos)
        {
            if(i!=xH && m_data.axis_X_color!='')
            {
                context.fillText(g_x1[i],A+ sx1+ax/2,B+ h_axisX+40*Z);
            }
            x1_pos=sx1+ax/2+x1_sL/2;
        }
        if(i==xH)
        {
            last_str1=sx1+ax/2;
        }

        if(i==xH)
        {
            txt_s[i]=g_y1s[i];
            txt_x[i]=sx1+ax/2;
            txt_y[i]=h_axisX-v-10*Z;
            ///context.fillText(g_y1s[i],sx1+ax/2,h_axisX-v-10);
            y1_pos=sx1+ax/2+y1_sL/2;
        }
        else if(sx1+ax/2-y1_sL/2>y1_pos||g_y1[i]>=v_max)
        {
            txt_s[i]=g_y1s[i];
            txt_x[i]=sx1+ax/2;
            txt_y[i]=h_axisX-v-10*Z;
            //let vs=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(rr.y1[i]));
            ///context.fillText(g_y1s[i],sx1+ax/2,h_axisX-v-10);
            y1_pos=sx1+ax/2+y1_sL/2;
            //context.strokeStyle = "#FFFFFF";
            //context.strokeText(rr.x1[i],sx1+ax/2,h_axisX+40);
        }
        else if(sx1+ax/2-y1_sL/2>y1_pos-y1_sL&&Math.abs(v_old-v)>y1_AL)
        {
            txt_s[i]=g_y1s[i];
            txt_x[i]=sx1+ax/2;
            txt_y[i]=h_axisX-v-10*Z;
            ///context.fillText(g_y1s[i],sx1+ax/2,h_axisX-v-10);
            y1_pos=sx1+ax/2+y1_sL/2;
        }
        else
        {
            txt_s[i]="";
            txt_x[i]=0;
            txt_y[i]=0;
        }
    }
    context.stroke();

    if(avg_color!="")
    {
        let xi  =0;
        let sx__=0;
        let sy__=0;
        let sxy__=0;
        let sx2__=0;
        let avg_a=0;
        let avg_b=0;
        for(let i=0;i<L;i++)
        {
            xi=i;
            sx__ =sx__ +i;//g_x1[i];
            sy__ =sy__ +g_y1[i];
            sxy__=sxy__+i*g_y1[i];
            sx2__=sx2__+i*i;
        }

        avg_a=(L*sxy__-sx__*sy__)/(L*sx2__-sx__*sx__);
        avg_b=(sy__-avg_a*sx__)/L;

        let xa1=pdx;//+px0+ax/2;
        let ddx=(px0_1+ax/2)/(ax+2*bx);
        v=(h_axisX-pdy)*(-avg_a*ddx+avg_b)/v_max;
        let ya1=v; //(h_axisX-pdy)*avg_b/v_max;
        let xa2=ww-(pdx); //-(pdx+px0+ax/2);
        v=(h_axisX-pdy)*(avg_a*(L-1+ddx)+avg_b)/v_max;
        let ya2=v;
        context.strokeStyle = avg_color;
        context.lineWidth=5;
        context.beginPath();
        context.moveTo(A+ xa1,B+ h_axisX-ya1);
        context.lineTo(A+ xa2,B+ h_axisX-ya2);
        //context.lineTo(100,100);
        context.stroke();
    }
    if(m_data.axis_S_color!='')
    {
        if(xH<0)
        {
            context.strokeStyle = m_data.axis_S_color;
        }
        else
        {
            context.strokeStyle = m_data.axis_S_Hcolor;
        }
        for(let i=0;i<L;i++)
        {
            if(txt_s[i]!="" && i!=xH)
            {
                context.fillText(txt_s[i],A+ txt_x[i],B+ txt_y[i]);
            }
        }
    }

    if(last_str1>=0)
    {
        context.fillStyle = "rgba(45,51,77,0.9)";
        context.fillRect(A+ last_str1-x1_sL/2-10*Z,B+ h_axisX+2*Z,x1_sL+20*Z,38*Z);
        context.fillRect(A+ last_str1-y1_sL/2-10*Z,B+ txt_y[xH]-35*Z,y1_sL+20*Z,33*Z);
        context.font = (24*Z)+"pt Arial";
        context.fillStyle = "#FFFFFF"; //m_data.Hcolor;
        context.fillText(m_data.in_data.gr_x1[xH],A+ last_str1,B+ h_axisX+ 40*Z);
        context.fillText(txt_s[xH],A+ txt_x[xH],B+ txt_y[xH]);
    }

    if(c_new==1)
    {
        context.fillStyle = "#FFFFFF";
        context.font = (20*Z)+"pt Arial";
        context.textBaseline = "bottom";
        context.textAlign = "right";
        context.fillText(y_ax_name,A+ ww-pdx,B+ hh-12*Z);
    }

    if(xH<0 && Snap==1)
    {
        snap_img.data=context.getImageData(A,B,ww,hh);
    }
/*
    if(xH<0)
    {
        snap_img.data=context.getImageData(0,0,ww,hh);
    }
    */
    return;
    
}
function draw_graph_04H(c,c_new,avg_color,m_data,y_ax_name,gr_data1p01,xH) // rect горизонтально
{
    if(!c){return;}
    let ww=1000;
    let hh=700;
    let pdx=20; //рамка сбоку (px)
    let pdyp=0; //V// 0.25; //рамка сверху (%)
    let px0=20; //первый отступ (px)
    let px0_1=m_data.px0_1; //75; //первый отступ слева (px)
    let px0_2=m_data.px0_2; //25; //первый отступ справа(px)
    let fp=m_data.fp; //0.65; //наполнение столбца по ширине (%)
    let axisX_h=0.1; //высота оси X (%)
    let axisX_hp=400; //80; //высота оси X (px)

    let h_name=60;//высота надписи от верхнего края (px)
    let h_AL=30; //размер буквы у надписи h

    let TR=10; //0.8; // Граница для компрессии, %


    ww=c.clientWidth*2;
    hh=c.clientHeight*2;

    if(c_new==1 || m_data.in_data === undefined)
    {
        c.width=ww;
        c.height=hh;
    }
    var context = c.getContext("2d");

    context.lineWidth=5;
    context.strokeStyle = "#AAAAAA";
    context.fillStyle = "#fd961f";

    context.font = "20pt Arial";
    //context.font = "20px Arial";
    context.textBaseline = "bottom";
    context.textAlign = "center";

    if(m_data.in_data === undefined)
    {
        context.textBaseline = "bottom";
        context.textAlign = "center";
        context.fillStyle = "#AAAAAA";
        context.font = "26pt Arial";
        context.fillText("No data",ww*0.5,hh*0.7);
        return;
    }

    
    //let h_axisX=hh-(hh*axisX_h);
    //V// let h_axisX=hh-axisX_hp;
    let h_axisX=ww-axisX_hp;
    if(m_data.axis_X_color!='')
    {
        context.lineWidth=m_data.axis_X;
        context.strokeStyle = m_data.axis_X_color;
        context.beginPath();
        //V// context.moveTo(pdx,h_axisX);
        context.moveTo(axisX_hp,px0_1);
        //V// context.lineTo(ww-pdx,h_axisX);
        context.lineTo(axisX_hp,hh-px0_2);
        //context.lineTo(100,100);
        context.stroke();
    }
    

    let rect_color=m_data.color;
    let g_x1 =m_data.in_data.gr_x1;
    let g_y1 =m_data.in_data.gr_y1k;
    let g_y1o =m_data.in_data.gr_y1;
    let g_y1s=m_data.in_data.gr_y1s;
    
    
    let L=g_x1.length;
    
    //М// let pdy=hh*pdyp;
    let pdy=200;

    //V// let ax=(ww-2.0*pdx-px0_1-px0_2)/((1-fp)/fp*(L-1)+L);
    let ax=(hh-2.0*pdx-px0_1-px0_2)/((1-fp)/fp*(L-1)+L);

    let bx=ax*(1-fp)/2/fp;
    let x1=0;
    let x2=0;
    let y1=0;
    let y2=0;
    let vn=0.99;
    let v=(h_axisX-pdy)*vn;
    //context.fillRect(pdx+px0,h_axisX-v,200,v);
    let v_max=0;
    if(L>0)
    {
        v_max=m_data.in_data.gr_y1km/m_data.yK;
    }

    let LL_x1=0;
    let LL_y1=0;
    for(let j=0;j<L;j++)
    {
        LL_x1=LL_x1+g_x1[j].length;
        LL_y1=LL_y1+g_y1s[j].length;
    }
    
    context.lineWidth=1;

    let sx1=0;
    let sx2=0;

    let x1_AL=14; //размер буквы у надписи x1
    let y1_AL=15; //размер буквы у надписи y1

    let x1_sL=30; //V// теперь просто высота =LL_x1/L*x1_AL; //длина надписи x1
    let x1_pos=0; //текущее окончание надписи x1
    let y1_sL=LL_y1/L*y1_AL; //длина надписи x1
    let y1_pos=0; //текущее окончание надписи x1
    let v_old=0; // высота надписи прошлого столбика
    let txt_x=[];
    let txt_y=[];
    let txt_s=[];
    gr_data1p01.px1=[];
    gr_data1p01.px2=[];
    gr_data1p01.py1=[];
    gr_data1p01.py2=[];
    gr_data1p01.pys=[];
    let last_str1=-1;
    
    for(let i=0;i<L;i++)
    {
        if(i==0)
        {
            sx1=pdx+px0_1;
        }
        else
        {
            sx1=sx2+2*bx;
        }
        sx2=sx1+ax;
        v_old=v;
        v=(h_axisX-pdy)*g_y1[i]/v_max;
        if(i==xH)
        {
            context.fillStyle = m_data.Hcolor;
        }
        else
        {
            context.fillStyle = rect_color;
        }
        //V// context.fillRect(sx1,h_axisX-v,ax,v);
        context.fillRect(axisX_hp,sx1,v,ax);
        /* Это отключили "Разрыв"
        if(g_y1[i]!=g_y1o[i])
        {
            let hk=hh/700;
            context.lineWidth=13*hk;
            context.strokeStyle='#222233';

            context.beginPath();
            //V// context.moveTo(pdx,h_axisX);
            //context.moveTo(axisX_hp+v*0.8,sx1+ax);
            context.moveTo(axisX_hp+v*0.8+ax*0.2,sx1-5*hk);
            //V// context.lineTo(ww-pdx,h_axisX);
            //context.lineTo(axisX_hp+v*0.8+ax*0.5,sx1);
            context.lineTo(axisX_hp+v*0.8,sx1+ax*(0.7));
            context.moveTo(axisX_hp+v*0.8+ax*0.2,sx1+ax*(0.3));
            context.lineTo(axisX_hp+v*0.8,sx1+ax+5*hk);
            //context.lineTo(100,100);
            context.stroke();
    
        }
        */
        /*
        gr_data1p01.px1[i]=sx1;
        gr_data1p01.px2[i]=sx1+ax;
        gr_data1p01.py1[i]=h_axisX-v;
        gr_data1p01.py2[i]=h_axisX;
        gr_data1p01.pys[i]=g_x1[i];
        */
        gr_data1p01.px1[i]=axisX_hp;
        gr_data1p01.px2[i]=axisX_hp+v;
        gr_data1p01.py1[i]=sx1;
        gr_data1p01.py2[i]=sx1+ax;
        gr_data1p01.pys[i]=g_x1[i];
        
        //context.fillStyle = "#FFFFFF";
        if(xH<0)
        {
            context.fillStyle = "#FFFFFF";
        }
        else
        {
            context.fillStyle = "#999999";
        }
        context.textAlign = "right";
        if(sx1+ax/2-x1_sL/2>x1_pos)
        {
            if(i!=xH && m_data.axis_X_color!='')
            {
                //V//context.fillText(g_x1[i],sx1+ax/2,h_axisX+40);
                context.fillText(g_x1[i],axisX_hp-10,sx1+ax/2+16);
            }
            x1_pos=sx1+ax/2+x1_sL/2;
        }
        if(i==xH)
        {
            last_str1=sx1+ax/2;
        }

        if(i==xH)
        {
            if((v)/(h_axisX-pdy)>=TR)
            {
                txt_s[i]=g_y1s[i];
                txt_x[i]=sx1+ax/2+20;
                txt_y[i]=axisX_hp+v*0.4;
            }
            else
            {
                txt_s[i]=g_y1s[i];
                txt_x[i]=sx1+ax/2+20;
                txt_y[i]=axisX_hp+v+10;
            }
            ///context.fillText(g_y1s[i],sx1+ax/2,h_axisX-v-10);
            y1_pos=sx1+ax/2+y1_sL/2;
        }
        else if(sx1+ax/2-y1_sL/2>y1_pos||g_y1[i]>=v_max)
        {
            /*
            txt_s[i]=g_y1s[i];
            txt_x[i]=sx1+ax/2;
            txt_y[i]=h_axisX-v-10;
            */
            if((v)/(h_axisX-pdy)>=TR)
            {
                txt_s[i]=g_y1s[i];
                txt_x[i]=sx1+ax/2+20;
                txt_y[i]=axisX_hp+v*0.4;
            }
            else
            {
                txt_s[i]=g_y1s[i];
                txt_x[i]=sx1+ax/2+20;
                txt_y[i]=axisX_hp+v+10;
            }
            //let vs=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(rr.y1[i]));
            ///context.fillText(g_y1s[i],sx1+ax/2,h_axisX-v-10);
            y1_pos=sx1+ax/2+y1_sL/2;
            //context.strokeStyle = "#FFFFFF";
            //context.strokeText(rr.x1[i],sx1+ax/2,h_axisX+40);
        }
        else if(sx1+ax/2-y1_sL/2>y1_pos-y1_sL&&Math.abs(v_old-v)>y1_AL)
        {
            if((v)/(h_axisX-pdy)>=TR)
            {
                txt_s[i]=g_y1s[i];
                txt_x[i]=sx1+ax/2+20;
                txt_y[i]=axisX_hp+v*0.4;
            }
            else
            {
                txt_s[i]=g_y1s[i];
                txt_x[i]=sx1+ax/2+20;
                txt_y[i]=axisX_hp+v+10;
            }
            ///context.fillText(g_y1s[i],sx1+ax/2,h_axisX-v-10);
            y1_pos=sx1+ax/2+y1_sL/2;
        }
        else
        {
            txt_s[i]="";
            txt_x[i]=0;
            txt_y[i]=0;
        }
    }
    context.stroke();

    if(avg_color!="")
    {
        let xi  =0;
        let sx__=0;
        let sy__=0;
        let sxy__=0;
        let sx2__=0;
        let avg_a=0;
        let avg_b=0;
        for(let i=0;i<L;i++)
        {
            xi=i;
            sx__ =sx__ +i;//g_x1[i];
            sy__ =sy__ +g_y1[i];
            sxy__=sxy__+i*g_y1[i];
            sx2__=sx2__+i*i;
        }

        avg_a=(L*sxy__-sx__*sy__)/(L*sx2__-sx__*sx__);
        avg_b=(sy__-avg_a*sx__)/L;

        let xa1=pdx;//+px0+ax/2;
        let ddx=(px0_1+ax/2)/(ax+2*bx);
        v=(h_axisX-pdy)*(-avg_a*ddx+avg_b)/v_max;
        let ya1=v; //(h_axisX-pdy)*avg_b/v_max;
        let xa2=ww-(pdx); //-(pdx+px0+ax/2);
        v=(h_axisX-pdy)*(avg_a*(L-1+ddx)+avg_b)/v_max;
        let ya2=v;
        context.strokeStyle = avg_color;
        context.lineWidth=5;
        context.beginPath();
        context.moveTo(xa1,h_axisX-ya1);
        context.lineTo(xa2,h_axisX-ya2);
        //context.lineTo(100,100);
        context.stroke();
    }
    if(m_data.axis_S_color!='')
    {
        if(xH<0)
        {
            context.strokeStyle = m_data.axis_S_color;
        }
        else
        {
            context.strokeStyle = m_data.axis_S_Hcolor;
        }
        context.textAlign = "left";
        for(let i=0;i<L;i++)
        {
            if(txt_s[i]!="" && i!=xH)
            {
                context.fillText(txt_s[i],txt_y[i],txt_x[i]-5);
            }
        }
    }

    if(last_str1>=0)
    {
        ////context.fillStyle = "rgba(30,36,62,0.9)"; //"rgba(45,51,77,0.9)";
        //V// 
        //context.fillRect(last_str1-x1_sL/2-10,h_axisX+2,x1_sL+20,38);
        ////context.fillRect(pdx,  last_str1-x1_sL/2-5,  axisX_hp-pdx-5,  x1_sL+10);
        //context.fillRect(last_str1-y1_sL/2-10,txt_y[xH]-35,y1_sL+20,33);
        ////context.fillRect(txt_y[xH]-5,last_str1-y1_sL/2-5, txt_s[xH].length*15+20,  x1_sL+10);
        context.font = "24pt Arial";
        context.fillStyle = "#FFFFFF"; //m_data.Hcolor;
        context.textAlign = "right";axisX_hp-10,sx1+ax/2+20
        context.fillText(g_x1[xH],axisX_hp-10,last_str1+x1_sL/2+4);
        context.textAlign = "left";
        context.fillText(txt_s[xH],txt_y[xH]  ,last_str1+x1_sL/2+4);
        //context.fillRect(txt_y[xH]-5,last_str1-y1_sL/2-5, txt_s[xH].length*15+20,  x1_sL+10);
        //context.fillText(txt_s[xH],txt_x[xH],txt_y[xH]);
    }

    if(c_new==1)
    {
        context.fillStyle = "#FFFFFF";
        context.font = "20pt Arial";
        context.textBaseline = "bottom";
        context.textAlign = "right";
        context.fillText(y_ax_name,ww-pdx,hh-5);
    }

/*
    if(xH<0)
    {
        snap_img.data=context.getImageData(0,0,ww,hh);
    }
    */
    return;
    
}
function draw_graph_05(c,Pn,c_new,          m_data,y_ax_name,gr_data1p01,snap_img,Snap,xH) // line
{

    if(!c)
    {
        return;
    }

    var context = c.getContext("2d");

    let Z=DGRM_params[Pn].Z; // zoom;
    let ww=1000;
    let hh=700;
    let pdx=20*Z; //рамка сбоку (px)
    let pdyp=0.25; //рамка сверху (%)
    let px0_1=m_data.px0_1*Z; //75; //первый отступ слева (px)
    let px0_2=m_data.px0_2*Z; //25; //первый отступ справа(px)
    //let px_mode=m_data.px_mode; // режим эмуляции ширины столбиков
    //let px0=px0_1+px0_2; //первый отступ (px)
    let fp=m_data.fp;///0.65; //наполнение столбца по ширине (%)
    let axisX_h=0.1; //высота оси X (%)
    let axisX_hp=80*Z; //высота оси X (px)

    let h_name=60;//высота надписи от верхнего края (px)
    let h_AL=30; //размер буквы у надписи h

    let ms=10*Z; //размер маркера

    //let xx1=c.width;
    //let xx2=c.style.width;
    //c.width=ww;
    //c.height=hh;

    let A=DGRM_params[Pn].A*c.clientWidth; // смещение по X
    let B=DGRM_params[Pn].B*c.clientHeight; // смещение по Y
    ww=c.clientWidth*Z;
    hh=c.clientHeight*Z;
    /*let c_new=1;
    if(cn<0)
    {
        c_new=1;
    }
    else
    {
        c_new=0;
    }*/
    if(c_new==1 || m_data.in_data === undefined)
    {
        //c.width=ww;
        //c.height=hh;
        context.clearRect(A, B, ww, hh);
    }
    
    context.lineWidth=5*Z;
    context.strokeStyle = "#AAAAAA";
    context.fillStyle = "#fd961f";

    if(m_data.in_data === undefined)
    {
        context.textBaseline = "bottom";
        context.textAlign = "center";
        context.fillStyle = "#AAAAAA";
        context.font = (26*Z)+"pt Arial";
        context.fillText("No data",A+ ww*0.5,B+ hh*0.7);
        return;
    }    
    
    //let h_axisX=hh-(hh*axisX_h);
    let h_axisX=hh-axisX_hp;    
    
    let L=m_data.in_data.gr_x1.length;
    //let K=m_data.in_data.length;
    let pdy=hh*pdyp;

    let ax=0;
    let bx=0;
    if( fp == 0)
    {
        ax=0;
        bx=(ww-2.0*pdx-px0_1-px0_2)/(L-1)/2.0;
    }
    else
    {
        ax=(ww-2.0*pdx-px0_1-px0_2)/((1-fp)/fp*(L-1)+L);
        bx=ax*(1-fp)/2/fp;
    }
    //let ax=(ww-2.0*(pdx+px0))/((1-fp)/fp*(L-1)+L);
    //let bx=ax*(1-fp)/2/fp;
    ///let ax=0;
    ///let bx=(ww-2.0*pdx-px0_1-px0_2)/(L-1)/2.0;
    let x1=0;
    let x2=0;
    let y1=0;
    let y2=0;
    let vn=0.99;
    let v=0;
    
    v=(h_axisX-pdy)*vn;

    let v_max=0;
    if(L>0)
    {
        v_max=m_data.in_data.gr_y1m/m_data.yK;
    }
    

    let LL_x1=0;
    let LL_y1=0;
    for(let j=0;j<L;j++)
    {
        LL_x1=LL_x1+m_data.in_data.gr_x1[j].length;
        LL_y1=LL_y1+m_data.in_data.gr_y1s[j].length;
    }
    
    
    context.lineWidth=5*Z;
    //context.strokeStyle = line_color;
    let sx1=0;
    let sx2=0;
    let sx1_old=0; //X у прошлой точки

    let x1_AL=14*Z; //размер буквы у надписи x1
    let y1_AL=15*Z; //размер буквы у надписи y1

    let x1_sL=LL_x1/L*x1_AL; //длина надписи x1
    let x1_pos=0; //текущее окончание надписи x1
    let y1_sL=LL_y1[0]/L*y1_AL; //длина надписи x1
    let y1_pos=0; //текущее окончание надписи x1
    //let v_old=[]; // высота надписи прошлого столбика
    let mark_buff_x =[];
    let mark_buff_y =[];
    context.fillStyle = "#FFFFFF";
    let mmy=0;
    let my =0;
    

    if(m_data.axis_Y_color!='')
    {
        context.lineWidth=5*Z;
        context.strokeStyle = "#AAAAAA";
        context.font = (20*Z)+"pt Arial";
        //context.font = "20px Arial";
        context.textBaseline = "bottom";
        context.textAlign = "left";

        context.beginPath();
        context.moveTo(A+ pdx,B+ h_axisX);
        context.lineTo(A+ ww-pdx,B+ h_axisX);
        //context.lineTo(100,100);
        context.stroke();
        
        let const1=5;
        //let const2=1.1;
        let r1=v_max/const1;
        let r2=Math.log10(r1);
        let r3=Math.floor(r2);
        let r4=r1/Math.pow(10,r3);
        let r5=Math.ceil(r4);
        let r6=r5*Math.pow(10,r3);
        let mys=0;
        for(let j=0;j<100; j++)
        {
            my=r6*j;
            mmy=h_axisX-(h_axisX-pdy)*my/v_max;
            context.fillRect(A+10*Z,B+ mmy-2*Z,20*Z,4*Z);
            context.fillText(my,A+ 10*Z+10*Z,B+ mmy-6*Z);
            if(my>v_max)
            {
                break;
            }
        }
    }
    else
    {
        context.clearRect(A+ 0,B+ h_axisX,ww,hh-h_axisX);
        context.lineWidth=5*Z;
        context.strokeStyle = "#AAAAAA";
        context.font = (20*Z)+"pt Arial";
        //context.font = "20px Arial";
        context.textBaseline = "bottom";
        context.textAlign = "left";

        context.beginPath();
        context.moveTo(A+ pdx,B+ h_axisX);
        context.lineTo(A+ ww-pdx,B+ h_axisX);
        //context.lineTo(100,100);
        context.stroke();
    }

    var sa=10*Z;
    var sr=20*Z;

    context.strokeStyle = "#2233EE"; //"#FFEE22";
    context.lineWidth=5*Z;//5;
    context.lineJoin="round";

    context.beginPath();
    context.moveTo(A+ 0+sa+sr,B+ 0+sa);
    context.lineTo(A+ww-sa-sr,B+ 0+sa);
    //context.moveTo(ww-sa   , 0+sa+sr);
    context.arc(A+ww-sa-sr,B+0+sa+sr,sr,3/2*Math.PI, 2*Math.PI);
    context.lineTo(A+ww-sa   ,B+hh-sa-sr);
    //context.moveTo(ww-sa-sr,hh-sa);
    context.arc(A+ww-sa-sr,B+hh-sa-sr,sr, 0, 1/2*Math.PI);
    context.lineTo(A+ 0+sa+sr,B+hh-sa);
    //context.moveTo( 0+sa   ,hh-sa-sr);
    context.arc(A+0+sa+sr,B+hh-sa-sr,sr, 1/2*Math.PI, 1*Math.PI);
    context.lineTo(A+ 0+sa   ,B+ 0+sa+sr);
    context.arc(A+0+sa+sr,B+0+sa+sr,sr, 1*Math.PI, 3/2*Math.PI);
    context.stroke();

    context.font = (20*Z)+"pt Arial";
    //context.font = "20px Arial";
    context.textBaseline = "bottom";
    context.textAlign = "center";
    context.lineWidth=6*Z;
    //context.strokeStyle = line_color;

    //v_old[0]=0;
    //v_old[1]=0;
    //v_old[2]=0;
    gr_data1p01.px1=[];
    gr_data1p01.px2=[];
    gr_data1p01.py1=[];
    gr_data1p01.py2=[];
    gr_data1p01.pys=[];
    let last_str1=-1;

    for(let i=0;i<L;i++)
    {
        sx1_old=sx1;
        //v_old[0]=v[0];
        //v_old[1]=v[1];
        //v_old[2]=v[2];
        if(i==0)
        {
            sx1=pdx+px0_1;
        }
        else
        {
            sx1=sx2+2*bx;
        }

        sx2=sx1+ax;   

        gr_data1p01.px1[i]=A+ sx1+ax/2;
        gr_data1p01.px2[i]=A+ sx1+ax/2;
        v=(h_axisX-pdy)*m_data.in_data.gr_y1[i]/v_max;
        gr_data1p01.py1[i]=B+ h_axisX-v;
        gr_data1p01.py2[i]=gr_data1p01.py1[i];
        gr_data1p01.pys[i]=m_data.in_data.gr_y1s[i];
        
        //context.fillStyle = line_color;
        //context.fillRect(sx1,h_axisX-v,ax,v);
        /*
        if(i==0)
        {
            context.beginPath();
            context.moveTo(sx1,h_axisX-v);
            //context.lineTo(50,50);
            
        }
        else
        {
            context.lineTo(sx1,h_axisX-v);
        }
        */
        //mark_buff_x[i]=sx1+ax/2.0-ms/2;
        //mark_buff_y[i]=h_axisX-v-ms/2;
        
        ///context.fillStyle = mark_color;
        ///context.fillRect(sx1+ax/2.0-ms/2,h_axisX-v-ms/2,ms,ms);



        if(i!=xH-1000)
        {
            if(xH<0)
            {
                context.fillStyle = "#FFFFFF";
            }
            else
            {
                context.fillStyle = "#999999";
            }

            if(sx1+ax/2-x1_sL/2>x1_pos)
            {
                //context.fillText(m_data.in_data.gr1_x1[i],sx1+ax/2,h_axisX+40);
                if(i!=xH && m_data.axis_X_color!='')
                {
                    context.fillText(m_data.in_data.gr_x1[i],A+ sx1+ax/2,B+ h_axisX+40*Z);
                }
                x1_pos=sx1+ax/2+x1_sL/2;
            }
        }
        if(i==xH)
        {
            last_str1=sx1+ax/2;
        }

        
    }
    context.stroke();
    if(last_str1>=0)
    {
        context.fillStyle = "rgba(45,51,77,0.9)";
        context.fillRect(A+ last_str1-x1_sL/2-10*Z,B+ h_axisX+2*Z,x1_sL+20*Z,38*Z);
        context.fillStyle = m_data.Hcolor;
        context.fillText(m_data.in_data.gr_x1[xH],A+ last_str1,B+ h_axisX+40*Z);
    }

    if(xH<0)
    {
        context.lineWidth   = m_data.Width;
        context.strokeStyle = m_data.color;
        for(let i=0;i<L;i++)
        {
            if(i==0)
            {
                context.beginPath();
                context.moveTo(gr_data1p01.px1[i],gr_data1p01.py1[i]);
                //context.lineTo(50,50);
                
            }
            else
            {
                context.lineTo(gr_data1p01.px1[i],gr_data1p01.py1[i]);
            }
        }
        context.stroke();

        context.fillStyle = m_data.point_color;
        for(let i=0;i<L;i++)
        {
            context.fillRect(gr_data1p01.px1[i]-ms/2,gr_data1p01.py1[i]-ms/2,ms,ms);
        }
        
    }
    if(xH>=0)
    {
        context.lineWidth   = m_data.HWidth;
        context.strokeStyle = m_data.Hcolor;
        for(let i=0;i<L;i++)
        {
            if(i==0)
            {
                context.beginPath();
                context.moveTo(gr_data1p01.px1[i],gr_data1p01.py1[i]);
                //context.lineTo(50,50);
                
            }
            else
            {
                context.lineTo(gr_data1p01.px1[i],gr_data1p01.py1[i]);
            }
        }
        context.stroke();

        let y1_pos=-100*Z;
        x1_pos=0;
        context.fillStyle = m_data.point_color;
        for(let i=0;i<L;i++)
        {
            context.fillRect(gr_data1p01.px1[i]-ms/2,gr_data1p01.py1[i]-ms/2,ms,ms);

            let yp1=0;
            let yp2=0;
            let y_sh=0;
            if(i==0)
            {
                yp1=-1000000000;
            }
            else {yp1=gr_data1p01.py1[i-1];}
            if(i==L-1)
            {
                yp2=-1000000000;
            }
            else {yp2=gr_data1p01.py1[i+1];}

            if(gr_data1p01.py1[i]>yp1 && gr_data1p01.py1[i]>yp2)
            {
                y_sh=60*Z;
            }

            if(i!=xH)
            {
                let o=context.measureText(gr_data1p01.pys[i]);
                let wt=o.width;
                
                
                if(gr_data1p01.px1[i]-wt/2>x1_pos || Math.abs(gr_data1p01.py1[i]-y1_pos)>30*Z || (gr_data1p01.py1[i]>yp1 && gr_data1p01.py1[i]>yp2))
                {
                    context.fillStyle = "rgba(5,5,5,0.5)";
                    context.fillRect(gr_data1p01.px1[i]-wt/2-5*Z,gr_data1p01.py1[i]-45*Z+y_sh,wt+10*Z,35*Z);
                    context.fillStyle = "#AAAAAA";
                    context.fillText(gr_data1p01.pys[i],gr_data1p01.px1[i],gr_data1p01.py1[i]-15+y_sh);
                    /*
                    if(i!=xH && m_data.axis_X_color!='')
                    {
                        context.fillText(g_x1[i],sx1+ax/2,h_axisX+40);
                    }
                    x1_pos=sx1+ax/2+x1_sL/2;*/
                    x1_pos=gr_data1p01.px1[i]+wt/2;
                    y1_pos=gr_data1p01.py1[i]+y_sh;
                }
            }
        }
    }

    if(c_new!=1000)
    {
        context.fillStyle = "#FFFFFF";
        context.font = (20*Z)+"pt Arial";
        context.textBaseline = "bottom";
        context.textAlign = "right";
        context.fillText(y_ax_name,A+ ww-pdx,B+ hh-12*Z);
    }

    if(xH<0 && Snap==1)
    {
        snap_img.data=context.getImageData(A,B,ww,hh);
    }

    return;
}

function draw_graph_06(c,Pn,c_new,avg_color,m_data,y_ax_name,gr_data1p01,snap_img,xH) // круги-бублики
{
    if(!c){return;}

    var context = c.getContext("2d");

    let Z=DGRM_params[Pn].Z; // zoom;
    let ww=1000;
    let hh=700;
    let pdx=20*Z; //рамка сбоку (px)
    let pdyp=0; //V// 0.25; //рамка сверху (%)
    let px0=20; //первый отступ (px)
    let px0_1=m_data.px0_1*Z; //75; //первый отступ слева (px)
    let px0_2=m_data.px0_2*Z; //25; //первый отступ справа(px)
    let py0_1=m_data.py0_1*Z; //75; //первый отступ сверху (px)
    let py0_2=m_data.py0_2*Z; //25; //первый отступ снизу(px)
    let fp=m_data.fp; //0.65; //наполнение столбца по ширине (%)
    let axisX_h=0.1; //высота оси X (%)
    let axisX_hp=400*Z; //80; //высота оси X (px)

    let h_name=60;//высота надписи от верхнего края (px)
    let h_AL=30; //размер буквы у надписи h


    let A=DGRM_params[Pn].A*c.clientWidth; // смещение по X
    let B=DGRM_params[Pn].B*c.clientHeight; // смещение по Y
    ww=c.clientWidth*Z;
    hh=c.clientHeight*Z;

    if(c_new==1 || m_data.in_data === undefined)
    {
        //c.width=ww;
        //c.height=hh;
        context.clearRect(A, B, ww, hh);
    }
    
    context.strokeStyle = "#2233EE"; //"#FFEE22";
    context.lineWidth=6*Z;//5;
    context.lineJoin="round";

    var sa=10*Z;
    var sr=20*Z;
    context.beginPath();
    context.moveTo(A+ 0+sa+sr,B+ 0+sa);
    context.lineTo(A+ww-sa-sr,B+ 0+sa);
    //context.moveTo(ww-sa   , 0+sa+sr);
    context.arc(A+ww-sa-sr,B+0+sa+sr,sr,3/2*Math.PI, 2*Math.PI);
    context.lineTo(A+ww-sa   ,B+hh-sa-sr);
    //context.moveTo(ww-sa-sr,hh-sa);
    context.arc(A+ww-sa-sr,B+hh-sa-sr,sr, 0, 1/2*Math.PI);
    context.lineTo(A+ 0+sa+sr,B+hh-sa);
    //context.moveTo( 0+sa   ,hh-sa-sr);
    context.arc(A+0+sa+sr,B+hh-sa-sr,sr, 1/2*Math.PI, 1*Math.PI);
    context.lineTo(A+ 0+sa   ,B+ 0+sa+sr);
    context.arc(A+0+sa+sr,B+0+sa+sr,sr, 1*Math.PI, 3/2*Math.PI);
    context.stroke();

    context.lineWidth=5*Z;
    context.strokeStyle = "#AAAAAA";
    context.fillStyle = "#fd961f";

    context.font = (20*Z)+"pt Arial";
    //context.font = "20px Arial";
    context.textBaseline = "bottom";
    context.textAlign = "left";

    if(m_data.in_data === undefined)
    {
        context.textBaseline = "bottom";
        context.textAlign = "center";
        context.fillStyle = "#AAAAAA";
        context.font = (26*Z)+"pt Arial";
        context.fillText("No data",A+ww*0.5,B+hh*0.7);
        return;
    }
    
    //let h_axisX=hh-(hh*axisX_h);
    //V// let h_axisX=hh-axisX_hp;
    let h_axisX=ww-axisX_hp;
    if(m_data.axis_X_color!='')
    {
        context.lineWidth=m_data.axis_X;
        context.strokeStyle = m_data.axis_X_color;
        context.beginPath();
        //V// context.moveTo(pdx,h_axisX);
        context.moveTo(A+axisX_hp,B+px0_1);
        //V// context.lineTo(ww-pdx,h_axisX);
        context.lineTo(A+axisX_hp,B+hh-px0_2);
        //context.lineTo(100,100);
        context.stroke();
    }
    
    let rect_color=m_data.color;
    let g_x1 =m_data.in_data.gr_x1;
    //let g_y1 =m_data.in_data.gr_y1k;
    let g_y1o =m_data.in_data.gr_y1;
    let g_y1s=m_data.in_data.gr_y1s;

    let L=g_x1.length;
    let su=0;
    let g_y1=[];
    for(let i=0; i<L; i++)
    {
        su=su+m_data.in_data.gr_y1k[i];
    }
    let sh=0;
    let st=0.005*Z;
    let max_i=0;
    let max_v=0;
    for(let i=0; i<L; i++)
    {
        g_y1[i] =m_data.in_data.gr_y1k[i]/su;
        g_y1s[i]=g_y1[i];
        if(max_v<=g_y1[i])
        {
            max_v=g_y1[i];
            max_i=i;
        }
        if(g_y1[i]<0.02)
        {
            g_y1[i]=g_y1[i]+0.01;
            sh=sh+0.01;
        }
        
    }
    g_y1[max_i]=g_y1[max_i]-sh;
    let LH=100*hh/800;
    let pp=2.0*Math.PI;
    let xz=(hh-py0_1-py0_2)/2-LH/2;
    context.lineWidth=LH;
    context.strokeStyle = '#FFAA55';
    //context.beginPath();

    

    gr_data1p01.pcx=A+ px0_1+xz+LH/2;
    gr_data1p01.pcy=B+ py0_1+xz+0.5*LH;
    gr_data1p01.r1 =xz-LH/2;
    gr_data1p01.r2 =xz+LH/2;
    gr_data1p01.data_c1=[];
    gr_data1p01.data_c2=[];
    gr_data1p01.data_l_x1=[];
    gr_data1p01.data_l_y1=[];
    gr_data1p01.data_l_x2=[];
    gr_data1p01.data_l_y2=[];
    
    
    let curr_a=-0.25;
    /*
    let ckr=30;
    let ckg=10;
    let ckb=30;
    */

    let str_H=50*Z;
    let i_stop=0;
    let Rx=0;
    let Ry=0;
    let g_y1ss=0;
    let g_y1ss0=0;
    let ix=0;
    let iy=0;
    let iyt=0;
    let dr=0;
    let H_color="";

    for(let i=0;i<L;i++)
    {
        /*
        let cr=(i*ckr+95)/100;
        let cg=(i*ckg+60)/100;
        let cb=(i*ckb+10)/100;
        cr=(cr-Math.floor(cr))*255;
        cg=(cg-Math.floor(cg))*255;
        cb=(cb-Math.floor(cb))*255;
        */
        //context.strokeStyle = "rgba("+cr+","+cg+","+cb+",1)";
        let i_color=seq_def_color(i,1,0);
        let t_color="#FF0000";
        let leg_sh=0;
        let din_R=LH;
        
        din_R=LH*1.3
        
        context.beginPath();
        let aa=0.9; //ALPHA!


        if(xH<0 || xH==i)
        {
            aa=1;
        }
        if(xH==i)
        {
            i_color=seq_def_color(i,aa,1);
            if(g_y1[i]>=0.5)
            {
                context.lineWidth=din_R/1.1;
            }
            else if(g_y1[i]>0.3 && g_y1[i]<0.5)
            {
                context.lineWidth=din_R/1.05;
            }
            else
            {
                context.lineWidth=din_R;
            }
            leg_sh=5*Z;
            
            g_y1ss=g_y1s[i];
            
            if(g_y1s[i]>=0.1)
            {
                g_y1ss=Math.round(g_y1s[i]*1000)/10;
            }
            else if(g_y1s[i]>=0.01)
            {
                g_y1ss=Math.round(g_y1s[i]*10000)/100;
            }
            else if(g_y1s[i]>=0.001)
            {
                g_y1ss=Math.round(g_y1s[i]*100000)/1000;
            }
            else if(g_y1s[i]<0.001)
            {
                g_y1ss="0+ ";
            }
            else
            {
                //g_y1ss=g_y1[i]*100;
            }
            //context.strokeStyle = i_color;
            context.fillStyle = i_color;
            //context.fillText(g_y1ss+"%", 100, 100);
        }
        else
        {
            
            i_color=seq_def_color(i,aa,0);
            context.lineWidth=LH;
        }

        g_y1ss0=0;
        if(g_y1s[i]>=0.03)
        {
            g_y1ss0=Math.round(g_y1s[i]*100)/1;
        }
        if(g_y1s[i]>=0.1)
        {
            g_y1ss0=Math.round(g_y1s[i]*1000)/10;
        }

        context.strokeStyle = i_color;
        context.arc(A+px0_1+xz+LH/2,B+py0_1+xz+0.5*LH,xz, curr_a*pp , (curr_a+g_y1[i]-st)*pp);
        gr_data1p01.data_c1[i]=curr_a;
        gr_data1p01.data_c2[i]=curr_a+g_y1[i]-st;
        //context.closePath();
        context.stroke();

        Rx0=Math.cos((curr_a+g_y1[i]-st+curr_a)/2.0*pp);
        Ry0=Math.sin((curr_a+g_y1[i]-st+curr_a)/2.0*pp);

        if(xH==i)
        {
            H_color=i_color;
            let nR=xz+din_R/2;
            let pT=(curr_a+g_y1[i]-st+curr_a)/2.0;
            
            let zh=0;
            let zk=1;
            
            if(pT>-0.25 && pT<0)
            {
                ix=px0_1+2*nR*0.9;
                iy=py0_1+din_R*0.3;
                iyt=0;
                dr=-1;
                zh=pT+0.125;
                zk=1;
            }
            else if(pT>0.75 && pT<=1)
            {
                ix=px0_1+2*nR*0.9;
                iy=py0_1+din_R*0.3;
                iyt=0;
                dr=-1;
                zh=pT-0.75-0.125;
                zk=1;
            }
            else if(pT>=0 && pT<=0.25)
            {
                ix=px0_1+2*nR*0.9;
                iy=py0_1+2*nR*0.9;
                iyt= 0; // 46; // y for text
                dr=-1;
                zh=-(pT-0.125);
                zk=-1;
            }
            else if(pT>0.25 && pT<=0.5)
            {
                ix=px0_1+din_R*0.3+30*Z;
                iy=py0_1+2*nR*0.9;
                iyt= 0; // 46; // y for text
                dr=1;
                zh=-(pT-0.25-0.125);
                zk=1;
            }
            else if(pT>0.5 && pT<=0.75)
            {
                ix=px0_1+din_R*0.3+50*Z;
                iy=py0_1+din_R*0.3;
                iyt=0;
                dr=1;
                zh=pT-0.5-0.125;
                zk=-1;
            }

            ix=ix+zh*500*Z;
            iy=iy+zk*zh*500*Z;
            iyt=iy+iyt-3*Z;
            
            //context.textAlign = "center";
            //context.font = "24pt Arial";
            //context.fillText(g_y1ss+"%", ix, iyt);

            //let zh=
            /*
            context.lineWidth=8;
            context.strokeStyle = "#FFFFFF";
            context.beginPath();
            context.moveTo(ix-50*dr, iy);
            context.lineTo(ix+50*dr, iy);
*/
            Rx=Math.cos((curr_a+g_y1[i]-st+curr_a)/2.0*pp);
            Ry=Math.sin((curr_a+g_y1[i]-st+curr_a)/2.0*pp);
            
            //context.lineTo(px0_1+xz+LH/2 + xz * Rx,py0_1+xz+0.5*LH + xz * Ry);
            //context.stroke();
            

            //context.fillText(curr_a, 1000, 500);
            //context.fillText(curr_a+g_y1[i]-st, 1000, 550);
            //context.fillText((curr_a+g_y1[i]-st+curr_a)/2.0, 1000, 600);
            //context.fillText(Math.round(zh*1000)/1000, 1000, 650);
            //context.strokeStyle = "#55FF55";
            //context.lineWidth=5;
            //context.beginPath();
            //context.moveTo(px0_1+xz+LH/2,py0_1+xz+0.5*LH);
            //let Rx=Math.cos((curr_a+g_y1[i]-st+curr_a)/2.0*pp);
            //let Ry=Math.sin((curr_a+g_y1[i]-st+curr_a)/2.0*pp);
            //context.lineTo(px0_1+xz+LH/2 + nR * Rx,py0_1+xz+0.5*LH + nR * Ry);
            //context.stroke();
        }

        //context.fillStyle = i_color;
        //context.fillRect(px0_1+(xz+LH/2)*2+50 - leg_sh, py0_1 + str_H * i - leg_sh, 40+leg_sh*2,40+leg_sh*2);
        if(xH<0 || xH==i)
        {
            t_color = "#FFFFFF";
        }
        else
        {
            t_color = "#999999";
        }
        //context.fillText("AAA", px0_1+(xz+LH/2)*2+50 + 40 + 30 , py0_1 + str_H * i + 40);
        context.textAlign = "left";
        if(py0_1 + str_H * i + 40*Z < hh-py0_2-0 || (i_stop==0 && i==L-1))
        {
            context.fillStyle=i_color;
            context.fillRect(A+px0_1+(xz+din_R/2)*2+50*Z - leg_sh, B+py0_1 + str_H * i - leg_sh, 40*Z+leg_sh*2,40*Z+leg_sh*2);
            context.fillStyle=t_color;
            context.fillText(g_x1[i], A+ px0_1+(xz+din_R/2)*2+Z*(50 + 40 + 30) , B+ py0_1 + str_H * i + 40*Z);
            gr_data1p01.data_l_x1[i]=A+ px0_1+(xz+din_R/2)*2+50*Z;
            gr_data1p01.data_l_y1[i]=B+ py0_1 + str_H * i;
            gr_data1p01.data_l_x2[i]=A+ ww-px0_2;
            gr_data1p01.data_l_y2[i]=B+ py0_1 + str_H * i + 40*Z;
        }
        else
        {
            if(i_stop==0)
            {
                context.fillStyle = t_color;
                context.fillRect(A+ px0_1+(xz+din_R/2)*2+50*Z - leg_sh, B+ py0_1 + str_H * i - leg_sh, 40*Z+leg_sh*2,40*Z+leg_sh*2);
                i_stop=py0_1 + str_H * i + 40*Z;
                context.fillText(".....", A+ px0_1+(xz+din_R/2)*2+Z*(50 + 40 + 30) , B+ py0_1 + str_H * i + 40*Z);
            }
            else
            {
                if(i==xH)
                {
                    context.fillStyle = t_color;
                    context.fillRect(A+ px0_1+(xz+din_R/2)*2+50*Z - leg_sh, i_stop - 40*Z - leg_sh, 40*Z+leg_sh*2,40*Z+leg_sh*2);
                    context.fillText(".....", A+ px0_1+(xz+din_R/2)*2+Z*(50 + 40 + 30) , B+ i_stop);
                }
            }
        }
        curr_a=curr_a+g_y1[i];
        
        //context.beginPath();
        //context.strokeStyle = '#AAFF55';
        //context.arc(px0_1+xz+LH/2,py0_1+xz,xz, 0.7*pp ,0.8*pp);
        if(g_y1ss0>0.05 && xH!=i)
        {
            context.font = (22*Z)+"pt Arial";
            context.textAlign = "center";
            context.fillStyle="#FFFFFF";
            context.fillText(g_y1ss0,A+ px0_1+xz+LH/2 + xz * (Rx0*1.0), B+ py0_1+18*Z +xz+0.5*LH + xz * (Ry0*1.0));
        }
    }

    if(xH>=0)
    {
        context.fillStyle=H_color;//"#FFFFFF";
        context.textAlign = "center";
        context.font = (24*Z)+"pt Arial";
        context.fillText(g_y1ss+"%", A+ ix, B+ iyt);

        //let zh=
        context.lineWidth=6*Z;
        context.strokeStyle = "#FFFFFF";
        context.beginPath();
        context.moveTo(A+ ix-50*dr*Z, B+ iy);
        context.lineTo(A+ ix+50*dr*Z, B+ iy);
        context.lineTo(A+ px0_1+xz+LH/2 + xz * (Rx*1.0), B+ py0_1+xz+0.5*LH + xz * (Ry*1.0));
        /*
        if(g_y1ss0>0.05)
        {
            context.lineTo(px0_1+xz+LH/2 + xz * (Rx*1.1),py0_1+xz+0.5*LH + xz * (Ry*1.1));
        }
        else
        {
            context.lineTo(px0_1+xz+LH/2 + xz * (Rx*1.0),py0_1+xz+0.5*LH + xz * (Ry*1.0));
        }
        */
        context.stroke();

        //let l_x=px0_1+xz+LH/2 + xz * (Rx*1.1);
        //let l_y=py0_1+xz+0.5*LH + xz * (Ry*1.1);

    }
    else
    {
        snap_img.data=context.getImageData(A,B,ww,hh);
    }

    //context.moveTo(px0_1+xz+xz,py0_1+xz);
    //context.lineTo(px0_1+xz+xz*0.7,py0_1+xz);
    //context.stroke();
    
    //М// let pdy=hh*pdyp;
    let pdy=200;

    return;
}
//////////////////////////////////////////////////////////////////////

function form_gr_data2(rr)
{
    let ret_agg=[];
    let in_gr_data={
        //gr_p: [],
        gr_y1m: 0,
        gr_y1km: 0,
        gr_x1: [],
        gr_y1: [],
        gr_y1k: [],
        gr_y1s: []
    };
    
    let gr_p=rr.p;
    let gr_x1=rr.x1;
    let gr_y1=rr.y1;
    let gr_y1m=rr.y1m;
    let gr_y1s=[];

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

    let i1=0;
    let i2=0;
    let i3=0;
    let L=gr_p.length;

    let dict_p=[];
    let dict_L=0;
    let curr_nc=-1;
    let ii=[];

    for(let i=0;i<L;i++)
    {
        //dict_L=gr_p.length;
        curr_nc=-1;
        for(let n=0; n<dict_L; n++)
        {
            if(gr_p[i]==dict_p[n])
            {
                curr_nc=n;
                break;
            }
        }
        if(curr_nc<0)
        {
            curr_nc=dict_L;
            dict_p[curr_nc]=gr_p[i];
            ii[curr_nc]=0;
            ret_agg[curr_nc]={
                gr_p: gr_p[i],
                gr_y1m: gr_y1m[i],
                gr_y1km: gr_y1m[i],
                gr_x1: [],
                gr_y1: [],
                gr_y1k: [],
                gr_y1s: []
            };
            dict_L=dict_L+1;
        }
        ret_agg[curr_nc].gr_x1[ii[curr_nc]]=gr_x1[i];
        ret_agg[curr_nc].gr_y1[ii[curr_nc]]=gr_y1[i];
        ret_agg[curr_nc].gr_y1k[ii[curr_nc]]=gr_y1[i];
        ret_agg[curr_nc].gr_y1s[ii[curr_nc]]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr_y1[i]));
        ii[curr_nc]=ii[curr_nc]+1;
    }
    return ret_agg;
}
function calc_compress(data_in)
{
    //let ret_agg=[];
    let N=data_in.length;
    let L=0; 
    let avx=0;
    let svx=0;
    //let tre=4;
    let tra=10;

    let q=0;
    let opt_tre=0;

    for(let n=0;n<N; n++)
    {
        L=data_in[n].gr_x1.length;
        for(let i=0;i<L; i++)
        {
            svx=svx + data_in[n].gr_y1[i];
        }
        avx=svx/L;
        //let lim_arr=[];
        opt_tre=0;
        let old_q=0;
        for(let tre=20;tre>2;tre=tre-1)
        {
            q=0;
            //tre=n;
            for(let i=0;i<L; i++)
            {
                if(data_in[n].gr_y1[i]/avx>tre)
                {
                    //lim_arr[i]=(data_in[n].gr_y1[i]-avx*tre)/tra + avx*tre;
                    q=q+1;
                }/*
                else
                {
                    lim_arr[i]=data_in[n].gr_y1[i];
                }*/
            }
            if(q>0 && q/L<=0.5)
            {
                if(q>old_q)
                {
                    opt_tre=tre;
                }
                old_q=q;
            }
            if(q/L>0.5)
            {
                break;
            }
        }
        
        
        if(opt_tre!=0)
        {
            let new_max0=0;
            for(let i=0;i<L; i++)
            {
                if(data_in[n].gr_y1[i]/avx<=opt_tre)
                {
                    if(new_max0<data_in[n].gr_y1k[i])
                    {
                        new_max0=data_in[n].gr_y1k[i];
                    }
                }
            }

            let new_max=0;
            for(let i=0;i<L; i++)
            {
                if(data_in[n].gr_y1[i]/avx>opt_tre)
                {
                    data_in[n].gr_y1k[i]=(data_in[n].gr_y1[i]-avx*opt_tre)/tra + new_max0*1.2;// avx*opt_tre;
                }
                else
                {
                    data_in[n].gr_y1k[i]=data_in[n].gr_y1[i];
                }

                if(new_max<data_in[n].gr_y1k[i])
                {
                    new_max=data_in[n].gr_y1k[i];
                }
            }
            data_in[n].gr_y1km=new_max;
        }
    }
}
function extract_part_gr_data2(gr_data,gr_part)
{
    let in_gr_data={
        gr_y1m: 0,
        gr_p: [],
        gr_x1: [],
        gr_y1: [],
        gr_y1s: []
    };
    
    gr_data.gr_y1m
    let gr_p=gr_data.p;
    let gr_x1=gr_data.x1;
    let gr_y1=gr_data.y1;
    let gr_y1m=gr_data.y1m;
    let gr_y1s=[];

    let L=gr_p.length;
    for( i=0;i<L;i++)
    {
        gr_y1s[i]=Intl.NumberFormat("ru-RU",{useGrouping:true}).format(Math.round(gr_y1[i]));
    }
    if(L>0)
    {
        in_gr_data.gr_y1m=gr_y1m[0];
    }
    
    in_gr_data.gr_p=gr_p;
    in_gr_data.gr_x1=gr_x1;
    in_gr_data.gr_y1=gr_y1;
    in_gr_data.gr_y1s=gr_y1s;

    return in_gr_data;
}
function disp_all_elem_0(/*ev,msg,canv,full*/)
{
    //let c=document.getElementById("canvas2D");
    /*
    var x = ev.clientX, y = ev.clientY;
    var ww=canv.clientWidth;
    var hh=canv.clientHeight;
    let L=DGRM_params.length;
*/
    let ii=-1;

    let i=-1;

    var context = canv2D.getContext("2d");
    context.clearRect(0, 0, canv2D.clientWidth, canv2D.clientHeight);

    if(n_main_DGRM!=0 )
    {draw_graph_data(1,2);}
    if(n_main_DGRM!=1 )
    {draw_graph_data_141(2);}
    if(n_main_DGRM!=2 )
    {draw_graph_data_131(3,1);}
    if(n_main_DGRM!=3 )
    {draw_graph_data_141(4);}
    temp_2D_img.data=context.getImageData(0,0,canv2D.clientWidth,canv2D.clientHeight);
}
function disp_all_elem_1(re)
{
    //let c=document.getElementById("canvas2D");
    /*
    var x = ev.clientX, y = ev.clientY;
    var ww=canv.clientWidth;
    var hh=canv.clientHeight;
    let L=DGRM_params.length;
*/
    let ii=-1;

    let i=-1;

    //var context = canv2D.getContext("2d");
    //context.clearRect(0, 0, canv2D.clientWidth, canv2D.clientHeight);

    /*
    var context = canv.getContext("2d");
    context.clearRect(0, 0, ww, hh);
    */

    if(n_main_DGRM>=0)
    {
        
        //if(n_main_DGRM!=0 )
        //{graw_point1(-1,canv,0,0,gr_data1p_111,last_img_111[0]);}
        //else if(n_main_DGRM!=1 )
        //{graw_point4({nn:-1,xn:-1,tp:2},canv,1/*Pn*/,0,gr_data2p_141,last_img_141[1]);}
        //else if(n_main_DGRM!=2 )
        //{graw_point2(-1,canv,2/*Pn*/,0,gr_data3p_131,last_img_131[2]);}
        //else if(n_main_DGRM!=3 )
        //{graw_point4({nn:-1,xn:-1,tp:1},canv,3/*Pn*/,0,gr_data4p_141,last_img_141[3]);}

        if(re==1)
        {
            var context = canv2D.getContext("2d");
            context.putImageData(temp_2D_img.data,0,0);
            /*
        if(n_main_DGRM!=0 )
        {draw_graph_data(1,2);}
        if(n_main_DGRM!=1 )
        {draw_graph_data_141(2);}
        if(n_main_DGRM!=2 )
        {draw_graph_data_131(3,1);}
        if(n_main_DGRM!=3 )
        {draw_graph_data_141(4);}
        */
        }
        

        i=n_main_DGRM;

        var ev={pageX: 100000, pageY: 100000};
        var new_i={tp:-1,nn:-1,xn:-1};

        if(i==0)
        //{GR_func_111(ev,canv2D,0,1);}
        {draw_graph_data(1,2);}
        //else if(i==1)
        //{GR_func_141(ev,canv2D,0,2);}
        else if(i==1)
        {draw_cnv_02_141(canv2D,gr_data2p_141,new_i);}
        else if(i==2)
        {draw_graph_data_131(3,0);}
        else if(i==3)
        //{draw_cnv_04_141(canv2D,gr_data4p_141,new_i);}
        {draw_graph_data_141(4);}
        
        /*
        if(i==0)
        {GR_func_111(ev,canv,0,1);}
        else if(i==1)
        {draw_cnv_02_141(canv,gr_data2p_141,{xn:-1});}
        else if(i==2)
        {GR_func_131(ev,canv,0,3);}
        else if(i==3)
        {GR_func_141(ev,canv,0,4);}
        */


    }
}

function disp_all_elem(/*ev,msg,canv,full*/)
{
    //let c=document.getElementById("canvas2D");
    /*
    var x = ev.clientX, y = ev.clientY;
    var ww=canv.clientWidth;
    var hh=canv.clientHeight;
    let L=DGRM_params.length;
*/
    let ii=-1;

    let i=-1;

    var context = canv2D.getContext("2d");
    context.clearRect(0, 0, canv2D.clientWidth, canv2D.clientHeight);

    /*
    var context = canv.getContext("2d");
    context.clearRect(0, 0, ww, hh);
    */

    if(n_main_DGRM>=0)
    {
        
        //if(n_main_DGRM!=0 )
        //{graw_point1(-1,canv,0,0,gr_data1p_111,last_img_111[0]);}
        //else if(n_main_DGRM!=1 )
        //{graw_point4({nn:-1,xn:-1,tp:2},canv,1/*Pn*/,0,gr_data2p_141,last_img_141[1]);}
        //else if(n_main_DGRM!=2 )
        //{graw_point2(-1,canv,2/*Pn*/,0,gr_data3p_131,last_img_131[2]);}
        //else if(n_main_DGRM!=3 )
        //{graw_point4({nn:-1,xn:-1,tp:1},canv,3/*Pn*/,0,gr_data4p_141,last_img_141[3]);}

        if(n_main_DGRM!=0 )
        {draw_graph_data(1,2);}
        if(n_main_DGRM!=1 )
        {draw_graph_data_141(2);}
        if(n_main_DGRM!=2 )
        {draw_graph_data_131(3,1);}
        if(n_main_DGRM!=3 )
        {draw_graph_data_141(4);}

        temp_2D_img.data=context.getImageData(0,0,canv2D.clientWidth,canv2D.clientHeight);
        

        i=n_main_DGRM;

        if(i==0)
        {draw_graph_data(1,2);}
        else if(i==1)
        {draw_graph_data_141(2);}
        else if(i==2)
        {draw_graph_data_131(3,1);}
        else if(i==3)
        {draw_graph_data_141(4);}
        
        /*
        if(i==0)
        {GR_func_111(ev,canv,0,1);}
        else if(i==1)
        {draw_cnv_02_141(canv,gr_data2p_141,{xn:-1});}
        else if(i==2)
        {GR_func_131(ev,canv,0,3);}
        else if(i==3)
        {GR_func_141(ev,canv,0,4);}
        */


    }
    else
    {
        draw_graph_data(1,2);
        draw_graph_data_141(2);
        draw_graph_data_131(3,1);//,g_mode3_131);
        draw_graph_data_141(4);
        /*
        GR_func_111(ev,canv,0,1);
        GR_func_141(ev,canv,0,2);
        GR_func_131(ev,canv,0,3);
        GR_func_141(ev,canv,0,4);
        */
    }
}
function disp_elem2(ev,msg,canv)
{
    
    var x = ev.clientX, y = ev.clientY;
    var ww=canv.clientWidth;
    var hh=canv.clientHeight;
    let L=DGRM_params.length;

    var xp = ev.clientX/canv.clientWidth, yp = ev.clientY/canv.clientHeight;

    let ii=-1;

    let i=-1;

    /*
    var context = canv.getContext("2d");
    context.clearRect(0, 0, ww, hh);
    */

    if(n_main_DGRM>=0)
    {
        //return;
        //if(n_main_DGRM!=0 )
        //{graw_point1(-1,canv,0,0,gr_data1p_111,last_img_111[0]);}
        //else if(n_main_DGRM!=1 )
        //{graw_point4({nn:-1,xn:-1,tp:2},canv,1/*Pn*/,0,gr_data2p_141,last_img_141[1]);}
        //else if(n_main_DGRM!=2 )
        //{graw_point2(-1,canv,2/*Pn*/,0,gr_data3p_131,last_img_131[2]);}
        //else if(n_main_DGRM!=3 )
        //{graw_point4({nn:-1,xn:-1,tp:1},canv,3/*Pn*/,0,gr_data4p_141,last_img_141[3]);}

        /*
        if(n_main_DGRM!=0 )
        {draw_graph_data(1,2);}
        if(n_main_DGRM!=1 )
        {draw_graph_data_141(2);}
        if(n_main_DGRM!=2 )
        {draw_graph_data_131(3,1);}
        if(n_main_DGRM!=3 )
        {draw_graph_data_141(4);}
        */
        
        i=is_area_num(xp,yp,n_main_DGRM);

        if(i==n_main_DGRM)
        {
        /*
        if(i==0)
        {draw_graph_data(1,2);}
        else if(i==1)
        {draw_graph_data_141(2);}
        else if(i==2)
        {draw_graph_data_131(3,1);}
        else if(i==3)
        {draw_graph_data_141(4);}
        */
            if(i==0)
            {GR_func_111(ev,canv,0,1);}
            else if(i==1)
            {GR_func_141(ev,canv,0,2);}
            else if(i==2)
            {GR_func_131(ev,canv,0,3);}
            else if(i==3)
            {GR_func_141(ev,canv,0,4);}
        }
        else
        {
            i=n_main_DGRM;
            if(i==0)
            {GR_func_111(ev,canv,0,1);}
            else if(i==1)
            {GR_func_141(ev,canv,0,2);}
            else if(i==2)
            {GR_func_131(ev,canv,0,3);}
            else if(i==3)
            {GR_func_141(ev,canv,0,4);}
            
        }
        
        /*
        if(i==0)
        {GR_func_111(ev,canv,0,1);}
        else if(i==1)
        {draw_cnv_02_141(canv,gr_data2p_141,{xn:-1});}
        else if(i==2)
        {GR_func_131(ev,canv,0,3);}
        else if(i==3)
        {GR_func_141(ev,canv,0,4);}
        */


    }
    else
    {
        /*
        var context = canv2D.getContext("2d");
            context.putImageData(temp_2D_img.data,0,0);
        */
        var old_i=DGRM_mouse_act;
        i=is_area_num(xp,yp,-1);

        if(old_i!=i)
        {
            if(old_i==0)
            {GR_func_111(ev,canv,0,1);}
            else if(old_i==1)
            {GR_func_141(ev,canv,0,2);}
            else if(old_i==2)
            {GR_func_131(ev,canv,0,3);}
            else if(old_i==3)
            {GR_func_141(ev,canv,0,4);}
        }
            
        if(i==0)
        {GR_func_111(ev,canv,0,1);}
        else if(i==1)
        {GR_func_141(ev,canv,0,2);}
        else if(i==2)
        {GR_func_131(ev,canv,0,3);}
        else if(i==3)
        {GR_func_141(ev,canv,0,4);}
        
        /*
        //if(i==0)
        GR_func_111(ev,canv,0,1);
        //else if(i==1)
        GR_func_141(ev,canv,0,2);
        //else if(i==2)
        {GR_func_131(ev,canv,0,3);}
        //else if(i==3)
        {GR_func_141(ev,canv,0,4);}
        */
        /*
        draw_graph_data(1,2);
        draw_graph_data_141(2);
        draw_graph_data_131(3,1);//,g_mode3_131);
        draw_graph_data_141(4);
        */
        /*
        GR_func_111(ev,canv,0,1);
        GR_func_141(ev,canv,0,2);
        GR_func_131(ev,canv,0,3);
        GR_func_141(ev,canv,0,4);
        */
    }
}
function disp_elem(ev,msg,canv)
{
    var x = ev.clientX, y = ev.clientY;
    var ww=canv.clientWidth;
    var hh=canv.clientHeight;

    var xp = ev.clientX/canv.clientWidth, yp = ev.clientY/canv.clientHeight;

    let L=DGRM_params.length;

    
    let ii=-1;

    let i=-1;



    if(n_main_DGRM>=0)
    {
        

        if(n_main_DGRM!=0 && DGRM_params[0].on==1)
        {graw_point1(-1,canv,0,0,gr_data1p_111,last_img_111[0]);}
        else if(n_main_DGRM!=1 && DGRM_params[1].on==1)
        {graw_point4({nn:-1,xn:-1,tp:2},canv,1/*Pn*/,0,gr_data2p_141,last_img_141[1]);}
        else if(n_main_DGRM!=2 && DGRM_params[2].on==1)
        {graw_point2(-1,canv,2/*Pn*/,0,gr_data3p_131,last_img_131[2]);}
        else if(n_main_DGRM!=3 && DGRM_params[3].on==1)
        {graw_point4({nn:-1,xn:-1,tp:1},canv,3/*Pn*/,0,gr_data4p_141,last_img_141[3]);}
        

        i=n_main_DGRM;
        if( x>=DGRM_params[i].A*ww && x<=DGRM_params[i].A*ww+DGRM_params[i].Z*ww 
            && y>=DGRM_params[i].B*hh && y<=DGRM_params[i].B*hh+DGRM_params[i].Z*hh )
        {
            if(i==0)
            {GR_func_111(ev,canv,0,1);}
            else if(i==1)
            {GR_func_141(ev,canv,0,2);}
            else if(i==2)
            {GR_func_131(ev,canv,0,3);}
            else if(i==3)
            {GR_func_141(ev,canv,0,4);}

            ii=i;

            
        }
    }
    else
    {
        ii=-1;
        //if(ii<0)
        //{
            i=is_area_num(xp,yp,-1);
            
                    if(i==0)
                    {GR_func_111(ev,canv,0,1);}
                    else if(i==1)
                    {GR_func_141(ev,canv,0,2);}
                    else if(i==2)
                    {GR_func_131(ev,canv,0,3);}
                    else if(i==3)
                    {GR_func_141(ev,canv,0,4);}

                    ii=i;

        //}

        
        
            if(ii!=0 && DGRM_params[0].on==1)
            {graw_point1(-1,canv,0,0,gr_data1p_111,last_img_111[0]);}
            else if(ii!=1 && DGRM_params[1].on==1)
            {graw_point4({nn:-1,xn:-1,tp:2},canv,1/*Pn*/,0,gr_data2p_141,last_img_141[1]);}
            else if(ii!=2 && DGRM_params[2].on==1)
            {graw_point2(-1,canv,2/*Pn*/,0,gr_data3p_131,last_img_131[2]);}
            else if(ii!=3 && DGRM_params[3].on==1)
            {graw_point4({nn:-1,xn:-1,tp:1},canv,3/*Pn*/,0,gr_data4p_141,last_img_141[3]);}
    }
    

}

function zoom_one_DGRM(n)
{
    n_main_DGRM=n;
    if(n>=0)
    {
        DGRM_params[n].Z=0.7;
    }
    if(n==0)
    {
        DGRM_params[n].A=0.1;
        DGRM_params[n].B=0.1;
    }
    else if(n==1)
    {
        DGRM_params[n].A=0.2;
        DGRM_params[n].B=0.1;
    }
    else if(n==2)
    {
        DGRM_params[n].A=0.1;
        DGRM_params[n].B=0.2;
    }
    else if(n==3)
    {
        DGRM_params[n].A=0.2;
        DGRM_params[n].B=0.2;
    }

    if(n<0)
    {
        DGRM_params[0].Z=0.5;
        DGRM_params[0].A=0.0;
        DGRM_params[0].B=0.0;

        DGRM_params[1].Z=0.5;
        DGRM_params[1].A=0.5;
        DGRM_params[1].B=0.0;

        DGRM_params[2].Z=0.5;
        DGRM_params[2].A=0.0;
        DGRM_params[2].B=0.5;

        DGRM_params[3].Z=0.5;
        DGRM_params[3].A=0.5;
        DGRM_params[3].B=0.5;
    }
} 
function zoom_move_one_DGRM(n,dkx,dky)
{
    let Z=0.7;
    n_main_DGRM=n;
    if(n>=0)
    {
        DGRM_params[n].Z=Z;
    }
    if(n>=0)
    {
        DGRM_params[n].A=/*DGRM_params[n].A+*/dkx;
        DGRM_params[n].B=/*DGRM_params[n].B+*/dky;
    }

    if(n<0)
    {
        DGRM_params[0].Z=0.5;
        DGRM_params[0].A=0.0;
        DGRM_params[0].B=0.0;

        DGRM_params[1].Z=0.5;
        DGRM_params[1].A=0.5;
        DGRM_params[1].B=0.0;

        DGRM_params[2].Z=0.5;
        DGRM_params[2].A=0.0;
        DGRM_params[2].B=0.5;

        DGRM_params[3].Z=0.5;
        DGRM_params[3].A=0.5;
        DGRM_params[3].B=0.5;
    }
} 

function zoom_move_DGRM(n)
{
    //n_main_DGRM=n;
    if(n>=0)
    {
        DGRM_params[n].Z=DGRM_param0.Z + (DGRM_param1.Z - DGRM_param0.Z)*(1+n_main_DGRM_sh);
    }
    if(n==0)
    {
        DGRM_params[n].A=DGRM_param0.dA + (DGRM_param1.dA - DGRM_param0.dA)*(1+n_main_DGRM_sh);
        DGRM_params[n].B=DGRM_param0.dB + (DGRM_param1.dB - DGRM_param0.dB)*(1+n_main_DGRM_sh);
    }
    else if(n==1)
    {
        /*
        1-DGRM_param0.Z-DGRM_param0.dA (A=0.5)
        1-DGRM_param1.Z-DGRM_param1.dA (A=0.2)

        -DGRM_param1.Z-DGRM_param1.dA +DGRM_param0.Z+DGRM_param0.dA = 0.3
        */

        //DGRM_params[n].A = 1 -DGRM_param0.Z -DGRM_param0.dA - (-DGRM_param1.Z-DGRM_param1.dA +DGRM_param0.Z+DGRM_param0.dA);        
        
        DGRM_params[n].A = 1-DGRM_param0.Z-DGRM_param0.dA + (-DGRM_param1.Z-DGRM_param1.dA +DGRM_param0.Z+DGRM_param0.dA)*(1+n_main_DGRM_sh);
        
        DGRM_params[n].B=DGRM_param0.dB + (DGRM_param1.dB - DGRM_param0.dB)*(1+n_main_DGRM_sh);
    }
    else if(n==2)
    {
        DGRM_params[n].A=DGRM_param0.dA + (DGRM_param1.dA - DGRM_param0.dA)*(1+n_main_DGRM_sh);
        DGRM_params[n].B = 1-DGRM_param0.Z-DGRM_param0.dB + (-DGRM_param1.Z-DGRM_param1.dB +DGRM_param0.Z+DGRM_param0.dB)*(1+n_main_DGRM_sh);
    }
    else if(n==3)
    {
        DGRM_params[n].A = 1-DGRM_param0.Z-DGRM_param0.dA + (-DGRM_param1.Z-DGRM_param1.dA +DGRM_param0.Z+DGRM_param0.dA)*(1+n_main_DGRM_sh);
        DGRM_params[n].B = 1-DGRM_param0.Z-DGRM_param0.dB + (-DGRM_param1.Z-DGRM_param1.dB +DGRM_param0.Z+DGRM_param0.dB)*(1+n_main_DGRM_sh);
    }
} 
function is_area_num(xp,yp,n)
{
    var L=DGRM_params.length;
    //var x = m.clientX, y = m.clientY;
    if(n>=0)
    {
        if( xp>=DGRM_params[n].A && xp<=DGRM_params[n].A+DGRM_params[n].Z 
            && yp>=DGRM_params[n].B && yp<=DGRM_params[n].B+DGRM_params[n].Z )
        {
            DGRM_mouse_act=n;
            return n;
        }
    }
    for(var i=0; i<L; i++)
    {
        if( xp>=DGRM_params[i].A && xp<=DGRM_params[i].A+DGRM_params[i].Z 
            && yp>=DGRM_params[i].B && yp<=DGRM_params[i].B+DGRM_params[i].Z )
        {
            DGRM_mouse_act=i;
            return i;
        }
    }
    DGRM_mouse_act=-1;
    return -1;
}