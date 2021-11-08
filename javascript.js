
function showGridInfo(id)
{
    var x = document.getElementById(id);
    if(x.className === "flexbox-info")
    {
        if(x.style.overflow === "")
        {
            //style not set initially
            //javascript reads style from html which does not include the css styling
            x.style.overflow = "hidden";
            x.style.maxHeight = "320px";
        }
        else
        {
            if(x.style.maxHeight === "0px")
            {
                x.style.overflow = "hidden";
                x.style.maxHeight = "320px";
            }
            else
            {
                x.style.overflow = "hidden";
                x.style.maxHeight = "0px";
            }
        }
    }
}