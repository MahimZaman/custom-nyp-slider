jQuery(function ($) {
  $(".nyp").each(function () {
    const $wrapper = $(this);
    const $input = $wrapper.find('input[name="nyp"]');

    if (!$input.length || $wrapper.find(".custom-nyp-slider-wrap").length)
      return;

    const min = parseFloat($wrapper.attr("data-min-price")) || 0;
    const max = parseFloat($wrapper.attr("data-max-price")) || 0;
    if (max <= min) return;

    const initial = parseFloat($input.val()) || min;
    const currencySymbol = "Kr.";

    const html = `
        <div class="custom-nyp-slider-wrap">

			<div class="custom-nyp-range-labels custom-nyp-range-max">
                <span class="min">${min.toFixed(0)} kr.</span>
            </div>

            <div class="custom-nyp-slider-container">
                <div class="custom-nyp-track">
                    <div class="custom-nyp-progress"></div>
                    <div class="custom-nyp-thumb">
                        <div class="custom-nyp-tooltip">
                            <span class="value">${initial.toFixed(0)}</span>
                            <span class="arrow"></span>
                        </div>
                    </div>
                </div>
            </div>

			<div class="custom-nyp-range-labels custom-nyp-range-max">
                <span class="max">${max.toFixed(0)} kr.</span>
            </div>

        </div>`;

    $input.after(html).hide().val(initial);

    const $track = $wrapper.find(".custom-nyp-track");
    const $progress = $wrapper.find(".custom-nyp-progress");
    const $thumb = $wrapper.find(".custom-nyp-thumb");
    const $tooltip = $wrapper.find(".custom-nyp-tooltip .value");

    let isDragging = false;

    function valueToPercent(value) {
      return ((value - min) / (max - min)) * 100;
    }

    function percentToValue(percent) {
      return Math.round(min + (percent / 100) * (max - min));
    }

    function updateUI(value) {
      const percent = valueToPercent(value);

      $progress.css("width", percent + "%");
      $thumb.css("left", percent + "%");
      $tooltip.text(value.toFixed(0));

      $input.val(value).trigger("input").trigger("change");
    }

    function handleMove(clientX) {
      const rect = $track[0].getBoundingClientRect();
      let percent = ((clientX - rect.left) / rect.width) * 100;

      percent = Math.max(0, Math.min(100, percent));

      const value = percentToValue(percent);
      updateUI(value);
    }

    // Click on track
    $track.on("click", function (e) {
      handleMove(e.clientX);
    });

    // Dragging
    $thumb.on("mousedown", function (e) {
      isDragging = true;
      e.preventDefault();
    });

    $(document).on("mousemove", function (e) {
      if (isDragging) handleMove(e.clientX);
    });

    $(document).on("mouseup", function () {
      isDragging = false;
    });

    // Initial render
    updateUI(initial);
  });
});
