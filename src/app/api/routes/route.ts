export const dynamic = "force-dynamic";

export async function GET(){
    return new Response("Hitting the get request",{
        status: 200,
    }); 
}


export async function POST(){
    return new Response("Hitting the post request",{
        status: 200,
    }); 
}
