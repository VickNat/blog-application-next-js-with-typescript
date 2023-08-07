import { NextApiRequest, NextApiResponse } from 'next'
import { blogs } from "@/data";

export default function handler(req: NextApiRequest, res: NextApiResponse){
  const id = req.query.id

  const filtered = blogs.filter(blogs => blogs.id === id)

  if (filtered.length > 0) {
    res.status(200).json(filtered[0])
  } else {
    res
      .status(404)
      .json({ message: `${id} was not found` })
  }
}