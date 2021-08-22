/** check if string contains some any unicode alphabet characters */
export const unicodeAlpha = (value: string): boolean => /^[a-zA-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľŁłĿŀŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſαβΓγΔδεζηΘθικΛλμνΞξΠπρΣσ,ςτυΦφχΨψΩω ]*$/.test(value)

/** check if string contains some any unicode alphabet characters or digits */
export const unicodeAlphaNum = (value: string): boolean => unicodeAlpha(value) || /[0-9]+/.test(value)

/** check if string contains between 6 and 14 digits and can consist of plus sign with national code and spaces between groups of digits  */
export const phoneNum = (value: string): boolean => /^\+?(?:[0-9] ?){6,14}[0-9]$/.test(value)
