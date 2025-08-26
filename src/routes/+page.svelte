<script>
  import {
    Page,
    Navbar,
    Block,
    Button,
    List,
    ListItem,
    BlockTitle,
    Toggle
  } from 'konsta/svelte';

  import {theme,updateTheme,color,updateColor} from '../stores.js'
	import { onMount } from 'svelte';

  import {button_vals} from '$lib/values.js'


function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}



  let calc_output="";

  function calculate(input_str){
      input_str = input_str.replaceAll("÷","/");
      input_str = input_str.replaceAll("×","*");
      input_str = input_str.replaceAll("−","-");

      console.log(input_str)

      let output = eval(input_str)
      return String(output)
  }

  function calculate_percent(input_str){
      let last_symbol_index;

      for(let i =input_str.length-1;i>=0;i++){
        if(!isNumeric(input_str[i])){
          last_symbol_index = i;
          break;
        }
      }

      let temp_str = input_str.slice(last_symbol_index,input_str.length);

      console.log(temp_str)
  }
  


  function showNumber (obj){
    console.log(obj);
    console.log(calc_output);
    
    switch(obj.value){
      case "clear" :{
        calc_output="";
        break;
      }

      case "del" :{
        calc_output = calc_output.slice(0,-1);
        calc_output = calc_output
        break;
      }

      case "full_screen":{
        if(!document.fullscreenElement){
          document.documentElement.requestFullscreen();
        }else{
          document.exitFullscreen();
        }
        break;
      }

      case "=":{
        try{
          calc_output = calculate(calc_output);
        }catch(err){
          calc_output = "Invalid.."
        }
        break;
      }

      case "%":{

        calculate_percent(calc_output)
      }

      default:{
        calc_output += obj.text
        calc_output = calc_output;
      }
    }
  }

  onMount(()=>{
    // document.documentElement.addEventListener("click",()=>{
    //     document.documentElement.requestFullscreen();
    // })


      //initial dark theme
      // updateColor(false);
      updateColor(!window.matchMedia("(prefers-color-scheme: dark)").matches);
  })
</script>

<Page>

  <div class="flex flex-col justify-between h-full">
    <div class="">
         <Block class="w-full flex justify-between hidden">
            theme : {$theme}
            
            <Toggle
                checked = {$theme == "ios"}
                onChange = {()=>{updateTheme($theme == "ios")}}
            >
            </Toggle>
        </Block>
        
        <Block class="w-full flex justify-between">
            color : {$color}
            
            <Toggle
                checked = {$color == "light"}
                onChange = {()=>{updateColor($color == "dark")}}
            >
            </Toggle>
        </Block>
    </div>

    <div class="h-full flex flex-col">
        <Block class="flex grow justify-end items-end"
            outline={true}
            strong={true}
        >
          <div type="text" readonly class="bg-transparent w-min h-full max-w-full wrap-break-word m-0 p-0 text-6xl  h-min border-0">{calc_output}</div>
        </Block>

        <Block class="grid mt-auto grid-cols-4 gap-4">
            {#each button_vals as btn}
                <Button 
                tonal={true}
                rounded={true}
                large={true}


                class="text-2xl font-light {btn.theme?? btn.theme}"

                onClick={() => showNumber(btn)}

                >
                    {@html btn.text}
                </Button>
                
            {/each}
        </Block>
    </div>
    
  </div>
 



</Page> 



