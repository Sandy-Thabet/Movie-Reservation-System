import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsOptional()
  @IsString()
  actors: string;

  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsInt()
  @Min(50)
  price: number;
}
