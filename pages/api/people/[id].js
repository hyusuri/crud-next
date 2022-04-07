import dbConnect from "../../../utils/dbConnect";
import People from "../../../models/People";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method
  } = req;

  switch(method) {
    case 'GET':
      try {
        const person = await People.findById(id);

        if(!person) {
          return res.status(400).json({ success: false});
        }

        res.status(200).json({ success: true, data: person});
      } catch(error) {
        res.status(400).json({ success: false, message: error.message});
      }
      break;
    case 'PUT':
      try {
        const person = await People.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });

        if (!person) {
          return res.status(400).json({ success: false});
        }
        res.status(200).json({ success: true, data: person});
      } catch (error) {
        res.status(400).json({ success: false, message: error.message});
      }
      break;
    case 'DELETE':
      try {
        const deletedPerson = await People.deleteOne({_id: id});

        if(!deletedPerson){
          return res.status(400).json({ success: false});
        }
        res.status(200).json({ success: true, data: {}});
      } catch (error) {
        res.status(400).json({ success: false, message: error.message});
      }
      break;
    default:
      res.status(400).json({ success: false});
      break;
  }
}
