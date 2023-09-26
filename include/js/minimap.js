window.onload = () => {
	console.log("Hello world");

	const svg = document.getElementById("svg");

	class SvgMinimap {
		svgElement;
		dimensions;

		// // 우리가 '끌기' 모드에 있는지 여부를 추적합니다. 우리는 항상 전체 문서의 모든 마우스에서 듣고 있기 때문이다
		// // 우리는 그것이 우리의 마우스 움직임으로 svg 요소를 끌어야 한다는 것을 알아야 한다.
		#draggingSvg;

		// 끌 때는 viewBox의 x, y 좌표를 업데이트해야 합니다. 상대 항력 거리를 파악하는 방법
		// 드래그 후 위치와 비교하려면 시작 위치가 필요합니다.
		#lastMouseXPosition;
		#lastMouseYPosition;

		// #baseX;
		// #baseY;

		constructor(svgElement) {
			this.svgElement = svgElement;
			if (!svgElement.getAttribute("viewBox")) {
				console.warn("No viewBox found on the svgElement, overwriting");
				const viewBox = `0 0 ${svgElement.clientWidth} ${svgElement.clientHeight}`;
				console.log({ viewBox });
				svgElement.setAttribute("viewBox", viewBox);
			}
			this.dimensions = this.getDimensions();

			this.#draggingSvg = false;
			this.#lastMouseXPosition = -1;
			this.#lastMouseYPosition = -1;
			// this.#baseX = undefined;
			// this.#baseY = undefined;

			this.createMinimap();

			setInterval(() => {
				this.tick();
			}, 1);
		}

		// viewBox 치수를 기준으로 최소 지도 업데이트

		tick() {
			const virtualViewBox = document.getElementById("virtualViewBox");
			const [x, y, width, height] = this.svgElement.getAttribute("viewBox").split(" ").map(Number);
			virtualViewBox.setAttribute("x", x.toFixed(2));
			virtualViewBox.setAttribute("y", y.toFixed(2));
			virtualViewBox.setAttribute("width", width.toFixed(2));
			virtualViewBox.setAttribute("height", height.toFixed(2));
		}

		// 가상 맵 및 virtualViewBox를 생성하여 최소 맵 구성 요소를 초기화합니다
		createMinimap() {
			const minimap = document.getElementById("minimap");

			const viewBoxWidth = this.dimensions.maxX - this.dimensions.minX;
			const viewBoxHeight = this.dimensions.maxY - this.dimensions.minY;
			minimap.setAttribute("viewBox", `${this.dimensions.minX} ${this.dimensions.minY} ${viewBoxWidth} ${viewBoxHeight}`);
			minimap.innerHTML = this.svgElement.innerHTML;
			minimap.innerHTML += `<rect x="${this.dimensions.minX}" y="${this.dimensions.minY}" width="${viewBoxWidth}" height="${viewBoxHeight}" style="fill:green;stroke:green;stroke-width:2;fill-opacity:0.1;stroke-opacity:0.9" id="virtualViewBox" />`;

			minimap.addEventListener("mousedown", (ev) => {
				this.#draggingSvg = true;
				this.#lastMouseXPosition = ev.clientX;
				this.#lastMouseYPosition = ev.clientY;

				// const [x, y, width, height] = this.svgElement.getAttribute("viewBox").split(" ").map(Number)
				// this.#baseX = x;
				// this.#baseY = y;
			});
			document.addEventListener("mousemove", (ev) => {
				if (!this.#draggingSvg) {
					return;
				}

				// 현재 마우스 위치를 이전 위치와 비교
				const { clientX: mouseXPosition, clientY: mouseYPosition } = ev;

				// 원래 svg 요소를 이동해야 하는 양은 마우스를 움직이는 양입니다
				// 또한 우리가 어느 정도 규모의 미니맵을 검토하고 있다는 점도 고려하고 있습니다.
				// 예를 들면. 최소 맵이 100px 너비이지만 400px를 표시하는 경우 이동된 모든 픽셀을 이동해야 함을 의미합니다
				// 인자 4를 사용합니다. 이것은 표시된 척도로 나누는 것과 같습니다. 척도가 0.25이므로
				// 우리는 그 이미지를 실제 크기의 1/4로 보고 있습니다.
				const deltaX = (this.#lastMouseXPosition - mouseXPosition) / this.virtualViewBoxScale;
				const deltaY = (this.#lastMouseYPosition - mouseYPosition) / this.virtualViewBoxScale;

				this.#lastMouseXPosition = mouseXPosition;
				this.#lastMouseYPosition = mouseYPosition;

				const [x, y, width, height] = this.svgElement.getAttribute("viewBox").split(" ").map(Number);
				const rect = document.getElementById("virtualViewBox").getBoundingClientRect();

				// Not really necessary as it will get updated with the tick function anyways.
				// document.getElementById("virtualViewBox").setAttribute("x", `${rect.left+deltaX}`)
				// document.getElementById("virtualViewBox").setAttribute("y", `${rect.top+deltaY}`)

				// Width and height shouldn't change since we're only panning
				this.svgElement.setAttribute("viewBox", `${(x - deltaX).toFixed(2)} ${(y - deltaY).toFixed(2)} ${width} ${height}`);
			});

			document.addEventListener("mouseup", () => {
				this.#draggingSvg = false;
				this.#lastMouseXPosition = -1;
				this.#lastMouseYPosition = -1;
			});

			minimap.addEventListener(
				"wheel",
				(ev) => {
					// ev.deltaY is positive on zooming out and negative on zooming in.
					const zoomPercentage = ev.deltaY * -1;
					const zoomRatio = zoomPercentage * 0.01;
					this.zoom(zoomRatio);
				},
				{ passive: true },
			);
		}

		zoom(zoomRatio, leftSideRatio = 0.5, topSideRatio = 0.5) {
			const [viewBoxX, viewBoxY, viewBoxWidth, viewBoxHeight] = this.svgElement.getAttribute("viewBox").split(" ").map(Number);

			// 뷰에 추가할 너비 및 높이 계산상자
			// 힌트: 0.10 요인으로 확대하면 viewBox가 10% 더 작아집니다
			const deltaViewBoxWidth = viewBoxWidth * zoomRatio * -1;
			const deltaViewBoxHeight = viewBoxHeight * zoomRatio * -1;

			// 확대/축소 비율을 기준으로 새 viewBox 너비와 높이를 계산합니다.
			// 직관: 보기를 확대하면 상자의 픽셀 수가 줄어듭니다
			const newViewBoxWidth = viewBoxWidth + deltaViewBoxWidth;
			const newViewBoxHeight = viewBoxHeight + deltaViewBoxHeight;

			// 왼쪽 및 위쪽 비율을 기준으로 새 x 및 y 위치 계산
			// 직관: 왼쪽을 확대하면 viewBoxWidth가 작아집니다
			// 즉, deltaViewBoxWidth가 0 미만입니다.
			// 즉, viewBoxX가 증가해야 합니다.
			// 그러므로
			const newViewBoxX = viewBoxX + -1 * deltaViewBoxWidth * 0.5;
			const newViewBoxY = viewBoxY + -1 * deltaViewBoxHeight * 0.5;

			this.svgElement.setAttribute("viewBox", `${newViewBoxX} ${newViewBoxY} ${newViewBoxWidth} ${newViewBoxHeight}`);
		}

		get virtualViewBoxScale() {
			const minimap = document.getElementById("miniMap");
			const [, , viewBoxWidth, viewBoxHeight] = minimap.getAttribute("viewBox").split(" ").map(Number);
			const widthScale = minimap.clientWidth / viewBoxWidth;
			const heightScale = minimap.clientHeight / viewBoxHeight;

			if (widthScale.toFixed(2) !== heightScale.toFixed(2)) {
				console.error(`Got inconsistent scale: ${widthScale} vs ${heightScale}`);
			}

			return widthScale;
		}

		//   각 하위 노드의 혼합 및 최대 차원을 수집하여 svgElement의 차원을 가져옵니다.
		getDimensions() {
			const dimensions = [...this.svgElement.children].reduce((prev, cur) => {
				const curBox = cur.getBBox();
				const maxXCur = curBox.x + curBox.width;
				const maxYCur = curBox.y + curBox.height;

				if (!prev) {
					return { minX: curBox.x, maxX: maxXCur, minY: curBox.y, maxY: maxYCur };
				}

				let result = {
					minX: Math.min(prev.minX, curBox.x),
					maxX: Math.max(prev.maxX, maxXCur),
					minY: Math.min(prev.minY, curBox.y),
					maxY: Math.max(prev.maxY, maxYCur),
				};

				return result;
			}, null);

			return dimensions;
		}
	}

	new SvgMinimap(svg);
};
