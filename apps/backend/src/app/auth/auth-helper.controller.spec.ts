import { Test, TestingModule } from '@nestjs/testing';
import { AuthHelperController } from './auth-helper.controller';
import { HttpHelperService } from './auth-helper.service';

describe('AuthHelperController', () => {
  let controller: AuthHelperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthHelperController],
      providers: [HttpHelperService],
    }).compile();

    controller = module.get<AuthHelperController>(AuthHelperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
