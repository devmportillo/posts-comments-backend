import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async findByPostId(postId: string): Promise<Comment[]> {
    return this.commentModel.find({ postId: new Types.ObjectId(postId) }).exec();
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    // Convertir postId a ObjectId
    const commentData = {
      ...createCommentDto,
      postId: new Types.ObjectId(createCommentDto.postId)
    };
    const newComment = new this.commentModel(commentData);
    return newComment.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.commentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Comentario con ID ${id} no encontrado`);
    }
  }
}