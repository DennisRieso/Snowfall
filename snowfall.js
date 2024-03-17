
class Snowfall
{
		constructor(in_bild , in_anz_bilder = 50 , in_speed = 1 ) //default 50 / 1
		{
			this.bild 				= in_bild;
			this.snow_fall_speed 	= in_speed;
			this.max_img 			= 250;
			this.max_speed 			= 4;
			
			if(in_speed > this.max_speed)
			{
				console.log("Warning: Max Speed Violation. Limit: " + this.max_speed);
				in_speed = this.max_speed;
			}

			if(in_anz_bilder > this.max_img)
			{
				console.log("Warning: Too many Images! Limit: " + this.max_img);
				in_anz_bilder = this.max_img;
			}
			
			this.snow_img_count 	= in_anz_bilder;
			this.all_img			= Array();
			
			this.curr_pos_in_deg = 0;
			this.sin_left_add 	= 0;
			
			this.init();
		} 
		
		init()
		{
			for( let x = 0 ; x < this.snow_img_count; x++)
			{
				var tmp_elm 		= document.createElement("IMG"); 
				tmp_elm.src 		= this.bild;					
				tmp_elm.style.top 	= "0px";						
				tmp_elm.style.left 	= "0px";						
				tmp_elm.pos_top 	= 0.0;
				tmp_elm.pos_left 	= 0.0;
				
				document.body.appendChild(tmp_elm);
				
				this.setRandomPos(tmp_elm);
				
				// das img in ein array speichern
				this.all_img.push(tmp_elm);
			}
			// erster Aufruf
			var int_id = setInterval(this.run.bind(this), 32);
		}
			
		run()
		{
			for (var i = 0 ; i < this.snow_img_count; i++ )
			{
				this.snowfall(this.all_img[i]);
			}
		}
			
			
		snowfall( img_tag )
		{	
			this.curr_pos_in_deg = this.deg2rad(img_tag.pos_top * 6);
			this.sin_left_add	 = Math.sin(this.curr_pos_in_deg) * 5;
				
			// neue Position berechnen
			img_tag.pos_top		= img_tag.pos_top + ((img_tag.width * 0.025)  * this.snow_fall_speed);
			img_tag.pos_left	= img_tag.pos_left + this.sin_left_add;
				
			// neue Position schreiben
			img_tag.style.top 	= img_tag.pos_top + "px";
			img_tag.style.left 	= img_tag.pos_left + "px";
					
			if(this.snow_fall_speed > 0)
			{
				if(img_tag.pos_top > window.innerHeight)
				{
					this.setRandomPos(img_tag);
				}
			}
			else
			{
				if (img_tag.pos_top < (-1 * img_tag.height) )
				{
					this.setRandomPos(img_tag);
				}
			}
		}
			
			
		setRandomPos(img__tag) 
		{
			img__tag.pos_left 			= Math.random() * window.innerWidth;
			img__tag.style.left	 		= img__tag.pos_left + "px";
			
			if(this.snow_fall_speed > 0 )
			{
				img__tag.pos_top 		= Math.random() * (-1 * window.innerHeight) - img__tag.height;
				img__tag.style.top 		= img__tag.pos_top + "px";
			}
			else
			{
				img__tag.pos_top 		= Math.random() * (1 * window.innerHeight) + window.innerHeight;
				img__tag.style.top 		= img__tag.pos_top + "px";
			}
			img__tag.width 				= Math.random() * 30 + 15;
		}
			
			
		deg2rad(deg)
		{
			return deg * Math.PI * 0.00555;
		}
			
		
	
}