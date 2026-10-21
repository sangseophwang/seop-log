interface JsonLdProps {
  data: Record<string, unknown>;
}

// 검색엔진용 구조화 데이터(JSON-LD).
// '<'를 이스케이프해 문자열 안의 태그 같은 값이 스크립트를 닫지 못하게 한다.
const JsonLd = ({ data }: JsonLdProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
};

export default JsonLd;
