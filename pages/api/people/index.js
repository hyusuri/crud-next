import dbConnect from "../../../utils/dbConnect";
import People from "../../../models/People";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch(method) {
    case 'GET':
      try {
        const pageOptions = {
          page: parseInt(req.query.page, 10) || 0,
          limit: parseInt(req.query.limit, 10) || 5
      }
        const people = await People.find({})
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit);

        const totalData = await People.find({}).count()
        const totalPages = Math.ceil(totalData / pageOptions.limit)-1;
        res.status(200).json({ success: true, totalData, totalPages ,data: people })
      } catch (error) {
        res.status(400).json({ success: false, message: error.message});
      }
      break;
    case 'POST':
      try {
        const person = await People.create(req.body);

        res.status(201).json({success: true, data: person})
      } catch (error) {
        if(error.code === 11000) {
          res.status(400).json({ success: false, message: "Email already used"});
        } else {
          res.status(400).json({ success: false, message: error.message});
        }
        
      }
      break;
    default:
      res.status(400).json({ success: false});
      break;
  }
}
