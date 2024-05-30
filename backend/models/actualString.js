module.exports=function(arr)
{
    const ans=[];
    const obj={
        BA:"AB",
        CB:"BC",
        DA:"AD",
        DC:"CD",
        ED:"DE",
        FE:"EF",
        FB:"BF",
        FE:"EF",
    };
    let len=arr.length;
    for(let i=0;i<len-1;i++)
    {
        var s=arr[i];
        s=s+arr[i+1];
        if(s in obj)
        {
            s=obj[s];
        }
        ans.push(s);
    }
    return ans;
}