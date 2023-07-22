//build-in types for API Routes
import { NextApiRequest, NextApiResponse } from 'next';


//req = HTTP incoming message, res = HTTP server response
export const handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({text: 'Yelosolutions is the Word'});
}



// export default function handler( req, res) {
//     res.status(200).json({text: 'Hello'});
// }