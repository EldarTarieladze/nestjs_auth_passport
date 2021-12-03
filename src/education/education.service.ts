import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EducationDto } from 'dto/education.dto';
import { IUserEducation } from 'models/education.model';
import { IUser } from 'models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class EducationService {
  constructor(
    @InjectModel('educations')
    private readonly educationModel: Model<IUserEducation>,
    @InjectModel('users')
    private readonly userModel: Model<IUser>,
  ) {}

  async getEducationInfo(educationID: string) {
    return await this.educationModel.findById(educationID).select('-_id -__v');
  }

  async addEducationInfo(userID: string, education: EducationDto) {
    try {
      const newEducation = new this.educationModel(education);
      console.log(newEducation, 'newEducation');
      const addEduciatonToUser = await this.userModel.findByIdAndUpdate(
        userID,
        {
          $push: {
            education: newEducation._id,
          },
        },
      );
      await newEducation.save();
      return 'education add successfully';
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  async updateEducationInfo(
    educationID: string,
    updatedEducation: EducationDto,
  ) {
    const education = await this.educationModel.findByIdAndUpdate(
      educationID,
      updatedEducation,
      {
        new: true,
      },
    );
    if (!education) throw new BadRequestException();
    return education;
  }

  async deleteEducationInfo(educationID: string) {
    try {
      const deleteEducation = await this.educationModel.findByIdAndDelete(
        educationID,
      );
      if (!deleteEducation) return 'this education not found';
      return 'education delete successfully';
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }
}
