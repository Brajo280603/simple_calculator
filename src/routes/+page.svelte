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


  let buttons = [
    "<","AC","%","÷",
    "7","8","9","×",
    "4","5","6","−",
    "1","2","3","+",
    "0","."," ","="
  ]

  onMount(()=>{
    document.documentElement.addEventListener("click",()=>{
        document.documentElement.requestFullscreen();
    })
  })
</script>

<Page>

  <div class="flex flex-col justify-between h-full">
    <div>
         <Block class="w-full flex justify-between">
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

    <div>
        <Block class="flex h-68"
            outline={true}
            strong={true}
        >

        </Block>

        <Block class="grid mt-auto grid-cols-4 gap-4">
            {#each buttons as btn}
                <Button 
                tonal={true}
                rounded={true}
                large={true}


                class="text-2xl font-light"

                >
                    {btn}
                </Button>
                
            {/each}
        </Block>
    </div>
    
  </div>
 



</Page> 



