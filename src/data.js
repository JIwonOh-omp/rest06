export const ICONS = {
  whisk: '<path d="M16 3c-2.5 2-3.5 5-3 8.5M16 3c2 1.5 3 4 2.5 7-.5 3-2 5-4.5 6M16 3c-1.5 1-2.5 3-2 6M11.5 12.5 5 19a2 2 0 0 0 2.8 2.8l6.5-6.5"/>',
  pencil: '<path d="M4 20l1-4L16 5a2.1 2.1 0 0 1 3 3L8 19l-4 1zM14 7l3 3"/>',
  yarn: '<circle cx="12" cy="12" r="8.5"/><path d="M6 9c3 1 6 1 9-1M5.5 13c4 1.5 8 .5 11.5-2M8 19c2-3 5-6 9-7M9 4.5C8 8 8.5 13 11 19"/>',
  pan: '<circle cx="11" cy="14" r="6"/><path d="M17 14h5M11 8.5V5"/>',
  camera: '<rect x="3" y="7" width="18" height="13" rx="3"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8.5 7l1.3-2.4h4.4L15.5 7"/>',
  pen: '<path d="M5 19l2-6L17 3a1.8 1.8 0 0 1 2.6 2.5L9.5 16 3.5 18.5zM14 6l3.5 3.5"/><path d="M3.5 20.5h6"/>',
  flower: '<circle cx="12" cy="9" r="2.6"/><path d="M12 6.4C12 3.5 9.6 2 8.2 3.4 6.8 4.8 8.7 7 12 9M12 6.4C12 3.5 14.4 2 15.8 3.4 17.2 4.8 15.3 7 12 9M9.7 10.4C7.2 9 4.5 9.8 4.8 11.8 5 13.7 8.2 13.2 12 9M14.3 10.4C16.8 9 19.5 9.8 19.2 11.8 19 13.7 15.8 13.2 12 9M12 11.5V21M12 21c-1.5 0-3-1-3.5-2.5M12 21c1.5 0 3-1 3.5-2.5"/>',
  coffee: '<path d="M5 8h12v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8z"/><path d="M17 9h2.2a2.3 2.3 0 0 1 0 4.6H17"/><path d="M8 3.5c-.6 1 .6 1.6 0 2.6M12 3.5c-.6 1 .6 1.6 0 2.6"/>',
  star: '<path d="M12 3.5l2.6 5.3 5.9.86-4.25 4.14 1 5.87L12 17.9l-5.25 2.77 1-5.87L3.5 9.66l5.9-.86L12 3.5z" fill="currentColor" stroke="none"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  layers: '<path d="M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5z"/><path d="M3.5 12 12 16.5 20.5 12M3.5 16 12 20.5 20.5 16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  spark: '<path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/>',
  play: '<path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" stroke="none"/>',
  heart: '<path d="M12 20s-7-4.6-7-9.5A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7 3.5C19 15.4 12 20 12 20z"/>',
  sun: '<circle cx="12" cy="12" r="4.3"/><path d="M12 2.5V5M12 19v2.5M4.4 4.4l1.8 1.8M17.8 17.8l1.8 1.8M2.5 12H5M19 12h2.5M4.4 19.6 6.2 17.8M17.8 6.2 19.6 4.4"/>',
  moon: '<path d="M19.5 14.3A7.5 7.5 0 1 1 9.7 4.5a6 6 0 0 0 9.8 9.8z"/>',
};

export const CATS = [
  { key: 'all',      label: '전체',       en: 'All' },
  { key: 'baking',   label: '베이킹',     en: 'Baking',      icon: 'whisk',  grad: ['#FF8A5B', '#FF6A45'] },
  { key: 'drawing',  label: '드로잉',     en: 'Drawing',     icon: 'pencil', grad: ['#C7B4FF', '#9B82F0'] },
  { key: 'craft',    label: '뜨개·공예', en: 'Craft',       icon: 'yarn',   grad: ['#6FD7BD', '#3FB89A'] },
  { key: 'cooking',  label: '쿠킹',       en: 'Cooking',     icon: 'pan',    grad: ['#FFB347', '#FF8A1E'] },
  { key: 'photo',    label: '사진',       en: 'Photo',       icon: 'camera', grad: ['#93C9FF', '#5BA6F5'] },
  { key: 'calli',    label: '캘리그라피', en: 'Lettering',   icon: 'pen',    grad: ['#FFAFC7', '#FF7DA3'] },
  { key: 'flower',   label: '플라워',     en: 'Flower',      icon: 'flower', grad: ['#FF9FB8', '#FF6A8A'] },
  { key: 'homecafe', label: '홈카페',     en: 'Home Café',   icon: 'coffee', grad: ['#FFD66B', '#F2B62E'] },
];
export const CATMAP = Object.fromEntries(CATS.map(c => [c.key, c]));

export const CLASSES = [
  { id:'c1', cat:'baking', title:'주말의 버터 스콘과 파운드케이크', instructor:'김다온', level:'입문', lessons:8, hours:'5시간 20분', price:'59,000', rating:4.9, students:'2,140',
    blurb:'오븐이 처음이어도 괜찮아요. 계량부터 굽는 온도까지, 매주 주말이 기다려지는 홈베이킹의 기본기를 차근차근 익혀요.',
    curric:['베이킹 도구와 재료 계량의 모든 것','폭신한 버터 스콘 반죽하기','겉바속촉 굽기 온도 잡기','레몬 글레이즈 파운드케이크','초코칩 & 얼그레이 응용편','선물용 포장과 보관법'] },
  { id:'c2', cat:'drawing', title:'아이패드로 그리는 오늘의 드로잉', instructor:'이서림', level:'입문', lessons:10, hours:'6시간 10분', price:'72,000', rating:4.8, students:'3,560',
    blurb:'좋아하는 순간을 그림으로 남겨요. 프로크리에이트 기본기부터 나만의 색감을 찾는 채색까지 손그림이 서툴러도 따라올 수 있어요.',
    curric:['프로크리에이트 인터페이스 친해지기','선 연습과 기본 도형','좋아하는 사물 관찰 드로잉','분위기를 만드는 색 조합','빛과 그림자로 입체감 주기','나만의 일러스트 완성하기'] },
  { id:'c3', cat:'craft', title:'손뜨개로 만드는 첫 니트 가방', instructor:'문해원', level:'입문', lessons:7, hours:'4시간 45분', price:'64,000', rating:5.0, students:'1,820',
    blurb:'실 한 가닥에서 시작하는 따뜻한 취미. 코잡기부터 마무리까지, 세상에 하나뿐인 니트 가방을 직접 완성해요.',
    curric:['실과 바늘 고르는 법','코잡기와 겉뜨기 기초','안뜨기로 무늬 만들기','가방 본체 떠올리기','손잡이 연결과 마무리','어플리케 장식 더하기'] },
  { id:'c4', cat:'cooking', title:'혼자여도 근사한 파스타 8접시', instructor:'정우진', level:'입문', lessons:9, hours:'5시간 50분', price:'68,000', rating:4.7, students:'4,210',
    blurb:'냉장고 속 재료로 레스토랑 한 접시를. 면 삶기부터 소스의 농도까지, 실패 없는 파스타의 공식을 알려드려요.',
    curric:['파스타 면 종류와 삶기','알리오 올리오 완벽 가이드','크림 소스의 농도 잡기','토마토 소스 끓이기','오일 파스타 응용','플레이팅과 와인 페어링'] },
  { id:'c5', cat:'photo', title:'폰카로 충분한 감성 사진', instructor:'한겨울', level:'입문', lessons:8, hours:'4시간 30분', price:'55,000', rating:4.8, students:'5,030',
    blurb:'비싼 장비는 필요 없어요. 빛을 읽는 눈과 구도만 알면, 늘 들고 다니는 휴대폰으로도 분위기 있는 사진을 담을 수 있어요.',
    curric:['빛의 방향 읽기','삼분할과 구도의 기본','음식 사진 맛있게 담기','인물과 일상 스냅','보정 앱으로 톤 맞추기','나만의 피드 만들기'] },
  { id:'c6', cat:'calli', title:'마음을 적는 손글씨 캘리그라피', instructor:'서가을', level:'입문', lessons:6, hours:'3시간 40분', price:'48,000', rating:4.9, students:'2,470',
    blurb:'또박또박 적어 내려가는 시간. 붓펜 하나로 엽서, 책갈피, 선물 태그까지 마음을 전하는 손글씨를 배워요.',
    curric:['붓펜 잡는 법과 기본 획','자음·모음 예쁘게 쓰기','단어에서 문장으로','리듬감 있는 배치','엽서와 캘리 소품 만들기','액자 작품 완성'] },
  { id:'c7', cat:'flower', title:'계절을 담는 플라워 어레인지', instructor:'노빛나', level:'입문', lessons:7, hours:'4시간 20분', price:'78,000', rating:4.9, students:'1,640',
    blurb:'집안에 작은 계절을 들여요. 꽃의 이름과 손질부터 컬러 매칭까지, 일상을 환하게 바꾸는 플라워 클래스.',
    curric:['꽃 고르기와 컨디셔닝','컬러 팔레트 이해하기','센터피스 만들기','데일리 미니 부케','드라이플라워 활용','공간에 어울리는 스타일링'] },
  { id:'c8', cat:'homecafe', title:'집에서 즐기는 카페 라떼 아트', instructor:'유한별', level:'입문', lessons:8, hours:'5시간', price:'62,000', rating:4.7, students:'2,890',
    blurb:'바리스타가 아니어도 괜찮아요. 우유 거품 만들기부터 하트, 로제타까지 집에서 완성하는 카페 한 잔의 여유.',
    curric:['에스프레소 추출 기본','우유 스티밍과 거품 결','하트 푸어링','로제타 그리기','아이스 음료 베리에이션','시즌 시그니처 메뉴'] },
  { id:'c9', cat:'baking', title:'무반죽 홈브레드와 천연발효빵', instructor:'김다온', level:'초급', lessons:9, hours:'6시간 30분', price:'74,000', rating:4.8, students:'1,330',
    blurb:'반죽 없이도 갓 구운 빵 냄새가 집을 채워요. 발효의 원리를 이해하면 빵은 더 이상 어렵지 않아요.',
    curric:['천연발효종 만들기','무반죽 기본 식빵','치아바타와 포카치아','발효 시간 컨트롤','크러스트 살리는 굽기','잼과 곁들임 만들기'] },
  { id:'c10', cat:'drawing', title:'수채화로 그리는 풍경 한 장', instructor:'이서림', level:'초급', lessons:8, hours:'5시간 15분', price:'66,000', rating:4.9, students:'1,970',
    blurb:'물과 색이 번지는 우연의 아름다움. 수채 특유의 투명한 색감으로 좋아하는 풍경을 그려봐요.',
    curric:['물감과 붓, 종이 고르기','물 조절과 그라데이션','하늘과 구름 표현','나무와 숲 그리기','물에 비친 풍경','완성과 액자 만들기'] },
  { id:'c11', cat:'cooking', title:'반찬 걱정 끝, 일주일 밑반찬', instructor:'정우진', level:'입문', lessons:10, hours:'6시간 40분', price:'58,000', rating:4.8, students:'3,720',
    blurb:'매일의 식탁이 든든해져요. 한 번 만들어 일주일 든든한, 손 빠른 밑반찬과 보관의 지혜.',
    curric:['기본 양념장 만들기','나물 무침 3종','조림과 볶음의 기본','달걀·두부 반찬','오래 가는 보관법','도시락 구성하기'] },
  { id:'c12', cat:'craft', title:'향기로 채우는 천연 캔들·디퓨저', instructor:'문해원', level:'입문', lessons:6, hours:'3시간 30분', price:'52,000', rating:4.7, students:'1,510',
    blurb:'좋아하는 향으로 공간을 디자인해요. 소이왁스 캔들부터 디퓨저까지, 선물하기 좋은 향기 소품을 만들어요.',
    curric:['왁스와 심지 이해하기','향료 블렌딩의 기초','컨테이너 캔들 만들기','디퓨저 베이스 배합','라벨과 패키징','시즌 향 레시피'] },
];

export const INSTRUCTORS = [
  { name:'김다온', field:'홈베이킹', initial:'다', color:['#FF8A5B','#FF6A45'], bio:'10년 차 파티시에. "실패한 반죽도 결국 배움이 된다"는 마음으로 가장 쉬운 베이킹을 알려드려요.' },
  { name:'이서림', field:'드로잉·일러스트', initial:'서', color:['#C7B4FF','#9B82F0'], bio:'그림책 일러스트레이터. 잘 그리는 것보다 즐겁게 그리는 법을 먼저 이야기해요.' },
  { name:'정우진', field:'홈쿠킹', initial:'우', color:['#FFB347','#FF8A1E'], bio:'동네 작은 식당 셰프 출신. 누구나 따라 하는 레시피로 식탁을 바꿔드려요.' },
  { name:'노빛나', field:'플라워·공간', initial:'빛', color:['#FF9FB8','#FF6A8A'], bio:'플로리스트이자 공간 스타일리스트. 계절의 색을 일상으로 옮기는 일을 합니다.' },
];

export const REVIEWS = [
  { name:'박O은', cl:'주말의 버터 스콘 클래스', initial:'박', color:['#FF8A5B','#FF6A45'], stars:5, text:'오븐 한 번 안 켜본 제가 주말마다 스콘을 굽고 있어요. 계량부터 차근차근 알려주셔서 한 번도 실패가 없었어요!' },
  { name:'최O진', cl:'아이패드 드로잉 클래스', initial:'최', color:['#C7B4FF','#9B82F0'], stars:5, text:'손그림이 콤플렉스였는데, 이젠 매일 한 장씩 그려요. 색 조합 알려주시는 부분이 정말 최고였습니다.' },
  { name:'한O아', cl:'첫 니트 가방 클래스', initial:'한', color:['#6FD7BD','#3FB89A'], stars:5, text:'실 한 가닥이 가방이 되는 게 신기해요. 완성하고 메고 다니니까 다들 어디서 샀냐고 물어봐요 :)' },
  { name:'정O호', cl:'파스타 8접시 클래스', initial:'정', color:['#FFB347','#FF8A1E'], stars:5, text:'주말 집밥이 레스토랑 됐습니다. 소스 농도 잡는 팁 하나로 요리가 완전히 달라졌어요.' },
  { name:'윤O리', cl:'감성 사진 클래스', initial:'윤', color:['#93C9FF','#5BA6F5'], stars:5, text:'폰카로 이 정도가 나온다는 게 놀라워요. 빛 읽는 법을 배우고 나서 여행 사진이 완전히 달라졌어요.' },
  { name:'강O우', cl:'캘리그라피 클래스', initial:'강', color:['#FFAFC7','#FF7DA3'], stars:5, text:'퇴근 후 붓펜 잡는 30분이 제일 좋아요. 친구 생일 카드 직접 써서 줬더니 감동받더라고요.' },
];

export const STATS = [
  { n:'1,200+', l:'개설된 클래스' },
  { n:'38만', l:'누적 수강생' },
  { n:'98%', l:'수강 만족도' },
  { n:'4.9', l:'평균 별점' },
];

export const PLANS = [
  { name:'싱글 클래스', desc:'딱 하나, 배우고 싶은 그것만', amount:'48,000', unit:'원~ / 클래스', feat:false,
    perks:['평생 소장 무제한 다시보기','클래스 자료 PDF 제공','수강생 커뮤니티 참여','모바일·PC 어디서나'] },
  { name:'올패스 멤버십', desc:'1,200개 클래스를 무제한으로', amount:'19,900', unit:'원 / 월', feat:true,
    perks:['전체 클래스 무제한 수강','신규 클래스 자동 업데이트','준비물 키트 10% 상시 할인','오프라인 모임 우선 초대','언제든 해지 가능'] },
  { name:'기프트 카드', desc:'마음을 선물하는 가장 다정한 방법', amount:'50,000', unit:'원~ / 충전', feat:false,
    perks:['원하는 금액으로 충전','예쁜 디지털 카드 전송','유효기간 1년','모든 클래스에 사용 가능'] },
];
