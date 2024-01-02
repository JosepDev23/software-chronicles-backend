import { HttpException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import User from './user.schema'
import { RegisterAuthDto } from './dtos/register-auth.dto'
import { compare, hash } from 'bcrypt'
import LoginAuthDto from './dtos/login-auth.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto): Promise<User> {
    const { password } = registerAuthDto
    const plainToHash = await hash(password, 10)
    const savedUser = new this.userModel({
      ...registerAuthDto,
      password: plainToHash,
      favouriteAdvertisementsIds: [],
    })
    return savedUser.save()
  }

  async login(
    loginAuthDto: LoginAuthDto,
  ): Promise<{ user: User; token: string }> {
    const { phoneNumber, password } = loginAuthDto
    let findUser = await this.userModel.findOne({ phoneNumber })
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404)

    const checkPassword = await compare(password, findUser.password)
    if (!checkPassword) throw new HttpException('WRONG_PASSWORD', 403)

    const payload: any = { id: findUser._id, phoneNumber: findUser.phoneNumber }
    const token = this.jwtService.sign(payload)

    findUser.password = password

    const data = {
      user: findUser,
      token,
    }

    return data
  }
}
