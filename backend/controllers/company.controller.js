import { Company } from "../models/company.model.js";
import getDataUri from "../utils/dataUriParser.js";
import cloudinary from "../utils/cloudinary.js";

//company ka name create krne k liye 
export const registerCompany =async(req,res)=>{
    try{
        const {companyName}=req.body;
        const userId=req.id;
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                success:false,
            });
        }
        let company =await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"you can't register same company",
                success:false,
            });
        }
        company=await Company.create({
            name:companyName,
            userId,

        });
        return res.status(201).json({
            message:"Company created successfullly",
            success:true,
            company,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Server error",
            success:false,
        });
    }

}

//get company 
export const getCompany =async(req,res)=>{
    try{
        const userId=req.id;
        const companies=await Company.find({});
        if(!companies){
            return res.status(404).json({
                message:"Companies not found ",
                success:false
            });
        }
        return res.status(200).json({
                companies,
                success:true
        });
    }
    catch(error){
        console.log(error);
    }
}

//get companyby id
export const getCompanyById=async(req,res)=>{
    try{
        const companyId=req.params.id
        const company= await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"Company Not Found",
                success:false
            });

        }
        return res.status(200).json({
            company,
            success:true
        })

    }
    catch(error){
        console.log(error);
    }
}
//update company
// update company
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    // base update data
    const updateData = {
      name,
      description,
      website,
      location,
    };

    // ✅ ONLY run this if file exists
    if (req.file) {
      const fileUri = getDataUri(req.file);

      const cloudResponse = await cloudinary.uploader.upload(
        fileUri.content,
        { folder: "company_logos" }
      );

      updateData.logo = cloudResponse.secure_url;
    }

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Information updated successfully",
      success: true,
      company,
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error.message);
    return res.status(500).json({
      message: error.message || "Server error",
      success: false,
    });
  }
};
