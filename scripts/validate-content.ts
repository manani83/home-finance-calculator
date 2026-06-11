import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { officialSourceMap } from "../src/data/sources";
import { guideFrontmatterSchema } from "../src/lib/content-schema";

const prohibitedPhrases = [
  "무조건 가능",
  "반드시 승인",
  "누구나 가능",
  "100% 보장",
  "최저금리 확정",
  "가장 좋은 대출",
];

export function validateGuideSource(source: string, fileName: string): string[] {
  const errors: string[] = [];
  const parsed = matter(source);
  const result = guideFrontmatterSchema.safeParse(parsed.data);

  if (!result.success) {
    for (const issue of result.error.issues) {
      errors.push(`${fileName}: 필수 메타데이터 ${issue.path.join(".")} 오류`);
    }
  }

  const sourceIds = Array.isArray(parsed.data.sources) ? parsed.data.sources : [];
  for (const sourceId of sourceIds) {
    if (typeof sourceId === "string" && !officialSourceMap.has(sourceId)) {
      errors.push(`${fileName}: 미등록 공식 출처 '${sourceId}'`);
    }
  }

  for (const phrase of prohibitedPhrases) {
    if (parsed.content.includes(phrase)) {
      errors.push(`${fileName}: 금지 표현 '${phrase}'을 포함합니다.`);
    }
  }

  return errors;
}

export function validateContentDirectory(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .flatMap((file) =>
      validateGuideSource(fs.readFileSync(path.join(directory, file), "utf8"), file),
    );
}

const isDirectRun = process.argv[1]
  ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;

if (isDirectRun) {
  const errors = validateContentDirectory(path.resolve("content/guides"));
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log("콘텐츠 검증 통과");
  }
}
