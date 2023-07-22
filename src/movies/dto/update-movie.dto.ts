import { PartialType } from "@nestjs/mapped-types";
import { CreateMovieDto } from "./create-movie.dto";


export class UpdateMovieDto extends PartialType(CreateMovieDto){} //모든 필드가 optional로 전환됨.